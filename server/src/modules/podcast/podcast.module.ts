import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodcastService } from './podcast.service';
import { PodcastResolver } from './podcast.resolver';
import { Podcast } from '@entities/podcast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast])],
  providers: [PodcastService, PodcastResolver],
})
export class PodcastModule {}
