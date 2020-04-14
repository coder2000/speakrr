import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { CategoryEntity } from '@entities/category.entity';
import { CategoryResolver } from './category.resolver';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryResolver],
})
export class CategoryModule {}
