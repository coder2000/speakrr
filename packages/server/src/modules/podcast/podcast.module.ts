import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PodcastService } from './podcast.service';
import { PodcastResolver } from './podcast.resolver';
import { Podcast } from '@entities/podcast.entity';
import { Queue } from '@entities/queue.entity';

@Module({
  imports: [
    NestjsQueryTypeOrmModule.forFeature([Podcast]),
    TypeOrmModule.forFeature([Queue]),
    LoggerModule.forRoot(),
  ],
  providers: [PodcastService, PodcastResolver],
})
export class PodcastModule {}
