import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { QueryService } from '@nestjs-query/core';
import { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { Category } from '@entities/category.entity';
import { Podcast } from '@entities/podcast.entity';

@Resolver(() => Category)
export class CategoryResolver extends CRUDResolver(Category, {
  create: { disabled: true },
  relations: { many: { podcasts: { DTO: Podcast } } },
}) {
  constructor(
    @InjectTypeOrmQueryService(Category)
    categoryService: QueryService<Category>,
  ) {
    super(categoryService);
  }
}
