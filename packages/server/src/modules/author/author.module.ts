import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Author } from '@entities/author.entity';
import { AuthorResolver } from './author.resolver';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([Author])],
  providers: [AuthorResolver],
})
export class AuthorModule {}
