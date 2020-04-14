import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { LoggerModule } from 'nestjs-pino';

import { QueueModule } from '@modules/queue';
import { PodcastService } from './podcast.service';
import { PodcastResolver } from './podcast.resolver';
import { PodcastEntity } from '@entities/podcast.entity';

@Module({
  imports: [
    NestjsQueryTypeOrmModule.forFeature([PodcastEntity]),
    LoggerModule.forRoot(),
    QueueModule,
  ],
  providers: [PodcastService, PodcastResolver],
  exports: [PodcastService],
})
export class PodcastModule {}
