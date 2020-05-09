import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { InjectQueryService, QueryService } from '@nestjs-query/core';

import { EpisodeEntity } from '@entities/episode.entity';
import { PodcastDto } from '@dto/podcast.dto';
import { EpisodeDto } from '@dto/episode.dto';

@Resolver()
export class EpisodeResolver extends CRUDResolver(EpisodeDto, {
  create: { disabled: true },
  relations: { one: { podcast: { DTO: PodcastDto } } },
}) {
  constructor(
    @InjectQueryService(EpisodeEntity)
    episodeService: QueryService<EpisodeEntity>,
  ) {
    super(episodeService);
  }
}
