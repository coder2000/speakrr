import Parser from 'rss-parser';

import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { PodcastEntity } from '@entities/podcast.entity';
import { QueueEntity } from '@entities/queue.entity';

@QueryService(PodcastEntity)
export class PodcastService extends TypeOrmQueryService<PodcastEntity> {
  private readonly rss: Parser;

  constructor(
    @InjectRepository(PodcastEntity)
    private podcastRepository: Repository<PodcastEntity>,
    @InjectRepository(QueueEntity)
    private queueRepository: Repository<QueueEntity>,
    private readonly logger: PinoLogger,
  ) {
    super(podcastRepository);

    this.logger.setContext(PodcastService.name);
    this.rss = new Parser({
      customFields: {
        feed: ['language'],
      },
    });
  }

  async findByAuthorId(authorId: number): Promise<PodcastEntity[]> {
    return this.podcastRepository.find({ where: { authorId: authorId } });
  }

  async findByCategoryId(categoryId: number): Promise<PodcastEntity[]> {
    return this.podcastRepository
      .createQueryBuilder('podcast')
      .leftJoinAndSelect('podcast.categories', 'category')
      .getMany();
  }

  @Cron('*/5 * * * *')
  async parseFromQueue() {
    this.logger.info('Starting parsing for next podcast.');
    var next = await this.queueRepository
      .createQueryBuilder('queue')
      .where('queue.completed = false')
      .getOne();

    if (!next) {
      this.logger.info('No podcast queued.');
      return;
    }

    this.logger.info('Parsing ' + next.url + ' ...');

    var podcast = await this.podcastRepository
      .createQueryBuilder('podcast')
      .where('podcast.link = :url', { url: next.url })
      .getOne();

    if (!podcast) {
      podcast = new PodcastEntity();
    }

    var data = await this.rss.parseURL(next.url);

    podcast.title = data.title;
    podcast.image = data.image.url;
    podcast.description = data.description;
    podcast.link = data.feedUrl;
    podcast.language = data.language;
    podcast.explicit = data.itunes.explicit === 'true' ? true : false;

    this.podcastRepository.save(podcast);

    this.logger.info('Completed parsing.');
    next.completed = true;
    this.queueRepository.save(next);
  }
}
