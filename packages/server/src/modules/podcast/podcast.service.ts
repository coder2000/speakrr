import Parser from 'rss-parser';

import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { PodcastEntity } from '@entities/podcast.entity';
import { QueueEntity } from '@entities/queue.entity';
import { AuthorService } from '@modules/author';
import { EpisodeService } from '@modules/episode';

@QueryService(PodcastEntity)
export class PodcastService extends TypeOrmQueryService<PodcastEntity> {
  private readonly rss: Parser;

  constructor(
    @InjectRepository(PodcastEntity)
    private podcastRepository: Repository<PodcastEntity>,
    @InjectQueryService(QueueEntity)
    private queueService: QueryService<QueueEntity>,
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

    next.map(async (cast) => {
      this.logger.info('Parsing %s ...', cast.url);

      let podcast: PodcastEntity;

      [podcast] = await this.query({
        filter: { link: { eq: cast.url } },
      });

      const data: Parser.Output | null = await this.rss.parseURL(cast.url).catch((error) => {
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

      podcast.title = data.title ? data.title : '';
      podcast.image = data.image?.url ? data.image.url : '';
      podcast.description = data.description ? data.description : '';
      podcast.link = data.feedUrl ? data.feedUrl : '';
      podcast.language = data.language;
      podcast.explicit = data.itunes?.explicit === 'true';
      podcast.author = author;

      podcast.episodes = [];

      data.items?.map(async (item) => {
        const episode = await this.episodeService.create(item);
        podcast.episodes.push(episode);
      });

      await this.podcastRepository.save(podcast);

      this.logger.info('Completed parsing.');
      await this.queueService.updateOne(cast.id, { completed: true });
    });
  }
}
