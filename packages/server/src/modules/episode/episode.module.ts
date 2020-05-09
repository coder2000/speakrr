import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { EpisodeEntity } from '@entities/episode.entity';
import { EpisodeService } from './episode.service';
import { EpisodeDto } from '@dto/episode.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([EpisodeEntity])],
      resolvers: [
        {
          DTOClass: EpisodeDto,
          EntityClass: EpisodeEntity,
          create: { disabled: true },
        },
      ],
    }),
  ],
  providers: [EpisodeService],
  exports: [EpisodeService],
})
export class EpisodeModule {}
