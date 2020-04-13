import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { LoggerModule } from 'nestjs-pino';

import { PodcastService } from './podcast.service';
import { PodcastResolver } from './podcast.resolver';
import { Podcast } from '@entities/podcast.entity';

@Module({
  imports: [
    NestjsQueryTypeOrmModule.forFeature([Podcast]),
    LoggerModule.forRoot(),
  ],
  providers: [PodcastResolver],
})
export class PodcastModule {}
