import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { QueryService } from '@nestjs-query/core';
import { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { AuthorService } from '@modules/author';
import { Podcast } from '@entities/podcast.entity';
import { Episode } from '@entities/episode.entity';
import { Author } from '@entities/author.entity';
import { Category } from '@entities/category.entity';
import { Inject, forwardRef } from '@nestjs/common';

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
    @Inject(forwardRef(() => AuthorService))
    private readonly authorService: AuthorService,
  ) {
    super(podcastService);
  }

  @ResolveField()
  async author(@Parent() podcast: Podcast): Promise<Author> {
    return this.authorService.getById(podcast.author.id);
  }
}
