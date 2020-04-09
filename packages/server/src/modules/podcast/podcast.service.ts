import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import Parser from 'rss-parser';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Podcast } from '@entities/podcast.entity';
import { Queue } from '@entities/queue.entity';

@Injectable()
export class PodcastService {
  private rss: Parser;

  constructor(
    @InjectRepository(Podcast) private podcastRepository: Repository<Podcast>,
    @InjectRepository(Queue) private queueRepository: Repository<Queue>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    this.rss = new Parser({
      customFields: {
        feed: ['language'],
      },
    });
  }

  findAll(): Promise<Podcast[]> {
    return this.podcastRepository.find();
  }

  findById(id: number): Promise<Podcast> {
    return this.podcastRepository.findOne(id);
  }

  async addByUrl(podcastUrl: string): Promise<Queue> {
    this.logger.debug('Received url: ' + podcastUrl);
    var queue = new Queue();

    queue.url = podcastUrl;

    this.queueRepository.save(queue);

    return queue;
  }

  @Cron('*/5 * * * *')
  async parseFromQueue() {
    this.logger.debug('Starting parsing for next podcast.');
    var next = await this.queueRepository
      .createQueryBuilder('queue')
      .where('queue.completed = false')
      .getOne();

    if (!next) {
      this.logger.debug('No podcast queued.');
      return;
    }

    this.logger.debug('Parsing ' + next.url + ' ...');

    var podcast = await this.podcastRepository
      .createQueryBuilder('podcast')
      .where('podcast.link = :url', { url: next.url })
      .getOne();

    if (!podcast) {
      podcast = new Podcast();
    }

    var data = await this.rss.parseURL(next.url);

    podcast.title = data.title;
    podcast.image = data.image.url;
    podcast.description = data.description;
    podcast.link = data.feedUrl;
    podcast.language = data.language;
    podcast.explicit = data.itunes.explicit === 'true' ? true : false;

    this.podcastRepository.save(podcast);

    this.logger.debug('Completed parsing.');
    next.completed = true;
    this.queueRepository.save(next);
  }
}
