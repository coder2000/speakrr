import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Episode } from '@entities/episode.entity';
import { EpisodeResolver } from './episode.resolver';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([Episode])],
  providers: [EpisodeResolver],
})
export class EpisodeModule {}
