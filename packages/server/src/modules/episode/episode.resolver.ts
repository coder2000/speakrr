import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { QueryService } from '@nestjs-query/core';
import { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { EpisodeEntity } from '@entities/episode.entity';
import { PodcastDto } from '@dto/podcast.dto';
import { EpisodeDto } from '@dto/episode.dto';

@Resolver()
export class EpisodeResolver extends CRUDResolver(EpisodeDto, {
  create: { disabled: true },
  relations: { one: { podcast: { DTO: PodcastDto } } },
}) {
  constructor(
    @InjectTypeOrmQueryService(EpisodeEntity)
    episodeService: QueryService<EpisodeEntity>,
  ) {
    super(episodeService);
  }
}
