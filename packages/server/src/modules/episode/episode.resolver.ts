import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { QueryService } from '@nestjs-query/core';
import { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { Episode } from '@entities/episode.entity';
import { Podcast } from '@entities/podcast.entity';

@Resolver(() => Episode)
export class EpisodeResolver extends CRUDResolver(Episode, {
  create: { disabled: true },
  relations: { one: { podcast: { DTO: Podcast } } },
}) {
  constructor(
    @InjectTypeOrmQueryService(Episode) episodeService: QueryService<Episode>,
  ) {
    super(episodeService);
  }
}
