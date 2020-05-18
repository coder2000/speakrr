import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { EpisodeEntity } from '@entities/episode.entity';
import { EpisodeDto } from '@dto/episode.dto';
import { EpisodeService } from './episode.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([EpisodeEntity])],
      resolvers: [
        {
          DTOClass: EpisodeDto,
          EntityClass: EpisodeEntity,
          ServiceClass: EpisodeService,
          create: { disabled: true },
        },
      ],
      services: [EpisodeService],
    }),
  ],
  providers: [EpisodeService],
  exports: [EpisodeService],
})
export class EpisodeModule {}
