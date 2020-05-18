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

    const next: QueueEntity[] = await this.queueService.query({
      filter: {
        or: [{ completed: { is: false } }, { completed: { is: null } }],
      },
    });

    this.logger.info('%d podcasts to parse', next.length);

    if (!next) {
      this.logger.info('No podcast queued.');
      return;
    }

    next.forEach(async (cast) => {
      this.logger.info('Parsing %s ...', cast.url);

      let podcast: PodcastEntity;

      [podcast] = await this.query({
        filter: { link: { eq: cast.url } },
      });

      const data: Parser.Output | null = await this.rss
        .parseURL(cast.url)
        .catch((error) => {
          this.logger.error(error.message);
          return null;
        });

      if (!data) {
        this.logger.info('Unable to process feed.');
        return;
      }

      this.logger.debug(data);

      if (!podcast) {
        podcast = new PodcastEntity();
      }

      const author = await this.authorService.findOrCreate(data.itunes?.author);

      podcast.title = data.title;
      podcast.image = data.image?.url;
      podcast.description = data.description;
      podcast.link = data.feedUrl;
      podcast.language = data.language;
      podcast.explicit = data.itunes?.explicit === 'true';
      podcast.author = author;

      podcast.episodes = [];

      data.items?.forEach(async (item) => {
        const episode = await this.episodeService.create(item);
        podcast.episodes.push(episode);
      });

      this.podcastRepository.save(podcast);

      this.logger.info('Completed parsing.');
      this.queueService.updateOne(cast.id, { completed: true });
    });
  }
}
