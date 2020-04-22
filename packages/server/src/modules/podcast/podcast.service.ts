import Parser from 'rss-parser';

import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { PodcastEntity } from '@entities/podcast.entity';
import { QueueEntity } from '@entities/queue.entity';
import { AuthorService } from '@modules/author';
import { EpisodeService } from '@modules/episode';
import { QueueService } from '@modules/queue';

@QueryService(PodcastEntity)
export class PodcastService extends TypeOrmQueryService<PodcastEntity> {
  private readonly rss: Parser;

  constructor(
    @InjectRepository(PodcastEntity)
    private podcastRepository: Repository<PodcastEntity>,
    private queueService: QueueService,
    private authorService: AuthorService,
    private episodeService: EpisodeService,
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

  @Cron('*/5 * * * *')
  async parseFromQueue() {
    this.logger.info('Starting parsing for next podcast.');

    var next: QueueEntity = await this.queueService.query({
      filter: {
        or: [{ completed: { is: false } }, { completed: { is: null } }],
      },
      paging: { limit: 1 },
    })[0];

    if (!next) {
      this.logger.info('No podcast queued.');
      return;
    }

    this.logger.info('Parsing ' + next.url + ' ...');

    var podcast: PodcastEntity = await this.query({
      filter: { link: { eq: next.url } },
    })[0];

    var data: Parser.Output = await this.rss
      .parseURL(next.url)
      .catch((error) => {
        this.logger.error(error.message);
        return null;
      });

    if (!data) {
      this.logger.info('Unable to process feed.');
      return;
    }

    if (!podcast) {
      podcast = new PodcastEntity();
    }

    var author = await this.authorService.findOrCreate(data.author.name);

    podcast.title = data.title;
    podcast.image = data.image.url;
    podcast.description = data.description;
    podcast.link = data.feedUrl;
    podcast.language = data.language;
    podcast.explicit = data.itunes.explicit === 'true' ? true : false;
    podcast.author = author;

    data.items.forEach(async (item) => {
      var episode = await this.episodeService.create(item);
      podcast.episodes.push(episode);
    });

    this.podcastRepository.save(podcast);

    this.logger.info('Completed parsing.');
    this.queueService.updateOne(next.id, { completed: true });
  }
}
