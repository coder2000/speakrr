import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { QueryService } from '@nestjs-query/core';
import { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { Author } from '@entities/author.entity';
import { Podcast } from '@entities/podcast.entity';

@Resolver(() => Author)
export class AuthorResolver extends CRUDResolver(Author, {
  create: { disabled: true },
  relations: { many: { podcasts: { DTO: Podcast } } },
}) {
  constructor(
    @InjectTypeOrmQueryService(Author) authorService: QueryService<Author>,
  ) {
    super(authorService);
  }
}
