import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '@modules/logger';
import { PodcastService } from './podcast.service';
import { PodcastResolver } from './podcast.resolver';
import { Podcast } from '@entities/podcast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast]), HttpModule, LoggerModule],
  providers: [PodcastService, PodcastResolver],
})
export class PodcastModule {}
