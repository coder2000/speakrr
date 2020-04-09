import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '@modules/logger';
import { PodcastService } from './podcast.service';
import { PodcastResolver } from './podcast.resolver';
import { Podcast } from '@entities/podcast.entity';
import { Queue } from '@entities/queue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast, Queue]), LoggerModule],
  providers: [PodcastService, PodcastResolver],
})
export class PodcastModule {}
