import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Category } from '@entities/category.entity';
import { CategoryResolver } from './category.resolver';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([Category])],
  providers: [CategoryResolver],
})
export class CategoryModule {}
