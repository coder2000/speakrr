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
    var episode = new EpisodeEntity();

    episode.title = item.title;
    episode.publication = new Date(item.pubDate);
    episode.url = item.enclosure.url;
    episode.filesize = item.enclosure.length;
    episode.guid = item.guid;
    episode.type = item.enclosure.type;
    episode.description = item.content;
    episode.image = item.itunes.image;
    episode.explicit = item.itunes.explicit == 'clean' ? true : false;
    episode.duration = item.itunes.duration;

    return this.episodeRepository.save(episode);
  }
}
