import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { QueryService } from '@nestjs-query/core';
import { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { AuthorEntity } from '@entities/author.entity';
import { AuthorDto } from '@dto/author.dto';
import { PodcastDto } from '@dto/podcast.dto';

@Resolver()
export class AuthorResolver extends CRUDResolver(AuthorDto, {
  create: { disabled: true },
  relations: { many: { podcasts: { DTO: PodcastDto } } },
}) {
  constructor(
    @InjectTypeOrmQueryService(AuthorEntity)
    authorService: QueryService<AuthorEntity>,
  ) {
    super(authorService);
  }
}
