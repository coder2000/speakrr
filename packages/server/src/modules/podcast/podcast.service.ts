import Parser from 'rss-parser';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { Podcast } from '@entities/podcast.entity';
import { Queue } from '@entities/queue.entity';

@Injectable()
export class PodcastService {
  private readonly rss: Parser;

  constructor(
    @InjectRepository(Podcast) private podcastRepository: Repository<Podcast>,
    @InjectRepository(Queue) private queueRepository: Repository<Queue>,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(PodcastService.name);
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
    this.logger.info('Received url: ' + podcastUrl);
    var queue = new Queue();

    queue.url = podcastUrl;
    queue.completed = false;

    this.queueRepository.save(queue);

    return queue;
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

    this.logger.info('Completed parsing.');
    next.completed = true;
    this.queueRepository.save(next);
  }
}
