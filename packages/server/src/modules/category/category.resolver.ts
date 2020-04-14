import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { QueryService } from '@nestjs-query/core';
import { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { Category } from '@entities/category.entity';
import { Podcast } from '@entities/podcast.entity';
import { PodcastService } from '@modules/podcast';

@Resolver(() => Category)
export class CategoryResolver extends CRUDResolver(Category, {
  create: { disabled: true },
  relations: { many: { podcasts: { DTO: Podcast } } },
}) {
  constructor(
    @InjectTypeOrmQueryService(Category)
    categoryService: QueryService<Category>,
    private readonly podcastService: PodcastService,
  ) {
    super(categoryService);
  }

  @ResolveField()
  async podcasts(@Parent() category: Category): Promise<Podcast[]> {
    const { id } = category;
    return this.podcastService.findByCategoryId(id);
  }
}
