import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { InjectQueryService, QueryService } from '@nestjs-query/core';

import { AuthorEntity } from '@entities/author.entity';
import { AuthorDto } from '@dto/author.dto';
import { PodcastDto } from '@dto/podcast.dto';

@Resolver()
export class AuthorResolver extends CRUDResolver(AuthorDto, {
  create: { disabled: true },
  relations: { many: { podcasts: { DTO: PodcastDto, disableUpdate: true } } },
}) {
  constructor(
    @InjectQueryService(AuthorEntity)
    authorService: QueryService<AuthorEntity>,
  ) {
    super(authorService);
  }
}
