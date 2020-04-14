import { Module, forwardRef } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorModule } from '@modules/author';
import { PodcastService } from './podcast.service';
import { PodcastResolver } from './podcast.resolver';
import { Podcast } from '@entities/podcast.entity';
import { Queue } from '@entities/queue.entity';

@Module({
  imports: [
    NestjsQueryTypeOrmModule.forFeature([Podcast]),
    TypeOrmModule.forFeature([Queue]),
    LoggerModule.forRoot(),
    forwardRef(() => AuthorModule),
  ],
  providers: [PodcastService, PodcastResolver],
  exports: [PodcastService],
})
export class PodcastModule {}
