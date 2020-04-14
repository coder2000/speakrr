import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { QueryService } from '@nestjs-query/core';
import { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { Author } from '@entities/author.entity';
import { Podcast } from '@entities/podcast.entity';
import { PodcastService } from '@modules/podcast';
import { Inject, forwardRef } from '@nestjs/common';

@Resolver(() => Author)
export class AuthorResolver extends CRUDResolver(Author, {
  create: { disabled: true },
  relations: { many: { podcasts: { DTO: Podcast } } },
}) {
  constructor(
    @InjectTypeOrmQueryService(Author) authorService: QueryService<Author>,
    @Inject(forwardRef(() => PodcastService))
    readonly podcastService: PodcastService,
  ) {
    super(authorService);
  }

  @ResolveField()
  async podcasts(@Parent() author: Author) {
    const { id } = author;
    return this.podcastService.findByAuthorId(id);
  }
}
