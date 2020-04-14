import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Author } from '@entities/author.entity';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([Author])],
  providers: [AuthorResolver, AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
