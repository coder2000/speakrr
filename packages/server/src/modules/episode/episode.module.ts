import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from '@entities/episode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Episode])],
})
export class EpisodeModule {}
