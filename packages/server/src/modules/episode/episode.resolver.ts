import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { QueryService } from '@nestjs-query/core';
import { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { Episode } from '@entities/episode.entity';
import { PodcastDto } from '@dto/podcast.dto';
import { EpisodeDto } from '@dto/episode.dto';

@Resolver(() => EpisodeDto)
export class EpisodeResolver extends CRUDResolver(EpisodeDto, {
  create: { disabled: true },
  relations: { one: { podcast: { DTO: PodcastDto } } },
}) {
  constructor(
    @InjectTypeOrmQueryService(Episode)
    episodeService: QueryService<EpisodeDto>,
  ) {
    super(episodeService);
  }
}
