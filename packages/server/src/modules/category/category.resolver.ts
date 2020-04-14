import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { QueryService } from '@nestjs-query/core';
import { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { CategoryEntity } from '@entities/category.entity';
import { PodcastDto } from '@dto/podcast.dto';
import { CategoryDto } from '@dto/category.dto';

@Resolver()
export class CategoryResolver extends CRUDResolver(CategoryDto, {
  create: { disabled: true },
  relations: { many: { podcasts: { DTO: PodcastDto, disableUpdate: true } } },
}) {
  constructor(
    @InjectTypeOrmQueryService(CategoryEntity)
    categoryService: QueryService<CategoryEntity>,
  ) {
    super(categoryService);
  }
}
