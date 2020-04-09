import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodcastService } from './podcast.service';
import { PodcastResolver } from './podcast.resolver';
import { Podcast } from '@entities/podcast.entity';
import { Queue } from '@entities/queue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast, Queue])],
  providers: [PodcastService, PodcastResolver],
})
export class PodcastModule {}
