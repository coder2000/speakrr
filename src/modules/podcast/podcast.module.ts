import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodcastService } from './podcast.service';
import { Podcast } from '@entities/podcast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast])],
  providers: [PodcastService],
})
export class PodcastModule {}
