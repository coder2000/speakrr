import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EpisodeEntity } from '@entities/episode.entity';
import { Item } from 'rss-parser';

@QueryService(EpisodeEntity)
export class EpisodeService extends TypeOrmQueryService<EpisodeEntity> {
  constructor(
    @InjectRepository(EpisodeEntity)
    private readonly episodeRepository: Repository<EpisodeEntity>,
  ) {
    super(episodeRepository);
  }

  async create(item: Item): Promise<EpisodeEntity> {
    const episode = new EpisodeEntity();

    if (item.title != null) {
      episode.title = item.title;
    }

    episode.publication = item.pubDate != null ? new Date(item.pubDate) : new Date(Date.now());
    episode.url = item.enclosure && item.enclosure.url ? item.enclosure.url : '';
    episode.filesize = item.enclosure && item.enclosure.length ? item.enclosure.length : 0;
    if (item.guid != null) {
      episode.guid = item.guid;
    }
    episode.type = item.enclosure && item.enclosure.type ? item.enclosure.type : '';
    if (item.content != null) {
      episode.description = item.content;
    }
    episode.image = item.itunes.image;
    episode.explicit = item.itunes.explicit === 'clean';
    episode.duration = item.itunes.duration;

    return this.episodeRepository.save(episode);
  }
}
