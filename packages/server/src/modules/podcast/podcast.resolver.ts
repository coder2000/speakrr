import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { QueryService } from '@nestjs-query/core';
import { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Podcast } from '@entities/podcast.entity';

@Resolver(() => Podcast)
export class PodcastResolver extends CRUDResolver(Podcast, {
  create: { disabled: true },
  update: { disabled: true },
}) {
  constructor(
    @InjectTypeOrmQueryService(Podcast)
    private readonly podcastService: QueryService<Podcast>,
  ) {
    super(podcastService);
  }
}
