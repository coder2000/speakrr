import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Category } from '@entities/category.entity';
import { CategoryResolver } from './category.resolver';
import { PodcastModule } from '@modules/podcast';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([Category]), PodcastModule],
  providers: [CategoryResolver],
})
export class CategoryModule {}
