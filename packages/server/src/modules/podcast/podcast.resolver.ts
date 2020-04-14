import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { QueryService } from '@nestjs-query/core';
import { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { Podcast } from '@entities/podcast.entity';
import { Episode } from '@entities/episode.entity';
import { Author } from '@entities/author.entity';
import { Category } from '@entities/category.entity';

@Resolver(() => Podcast)
export class PodcastResolver extends CRUDResolver(Podcast, {
  create: { disabled: true },
  relations: {
    many: { episodes: { DTO: Episode }, categories: { DTO: Category } },
    one: { author: { DTO: Author } },
  },
}) {
  constructor(
    @InjectTypeOrmQueryService(Podcast)
    podcastService: QueryService<Podcast>,
  ) {
    super(podcastService);
  }
}
