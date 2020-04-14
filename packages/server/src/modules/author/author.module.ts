import { Module, forwardRef } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Author } from '@entities/author.entity';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { PodcastModule } from '@modules/podcast';

@Module({
  imports: [
    NestjsQueryTypeOrmModule.forFeature([Author]),
    forwardRef(() => PodcastModule),
  ],
  providers: [AuthorResolver, AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
