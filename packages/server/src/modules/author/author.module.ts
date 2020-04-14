import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { AuthorEntity } from '@entities/author.entity';
import { AuthorResolver } from './author.resolver';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([AuthorEntity])],
  providers: [AuthorResolver],
})
export class AuthorModule {}
