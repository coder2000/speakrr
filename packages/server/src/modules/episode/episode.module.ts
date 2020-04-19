import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { EpisodeEntity } from '@entities/episode.entity';
import { EpisodeResolver } from './episode.resolver';
import { EpisodeService } from './episode.service';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([EpisodeEntity])],
  providers: [EpisodeResolver, EpisodeService],
  exports: [EpisodeService],
})
export class EpisodeModule {}
