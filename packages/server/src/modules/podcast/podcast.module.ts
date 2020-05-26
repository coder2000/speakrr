import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { LoggerModule } from 'nestjs-pino';

import { AuthorModule } from '@modules/author';
import { EpisodeModule } from '@modules/episode';
import { PodcastEntity } from '@entities/podcast.entity';
import { PodcastDto } from '@dto/podcast.dto';
import { QueueEntity } from '@entities/queue.entity';
import { PodcastService } from './podcast.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([PodcastEntity]),
        NestjsQueryTypeOrmModule.forFeature([QueueEntity]),
        AuthorModule,
        EpisodeModule,
      ],
      resolvers: [
        {
          DTOClass: PodcastDto,
          EntityClass: PodcastEntity,
          ServiceClass: PodcastService,
          create: { disabled: true },
        },
      ],
      services: [PodcastService],
    }),
    LoggerModule.forRoot(),
  ],
})
export class PodcastModule {}
