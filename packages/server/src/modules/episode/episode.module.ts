import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { EpisodeEntity } from '@entities/episode.entity';
import { EpisodeResolver } from './episode.resolver';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([EpisodeEntity])],
  providers: [EpisodeResolver],
})
export class EpisodeModule {}
