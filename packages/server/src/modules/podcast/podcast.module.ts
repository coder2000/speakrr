import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { LoggerModule } from 'nestjs-pino';

import { QueueModule } from '@modules/queue';
import { AuthorModule } from '@modules/author';
import { EpisodeModule } from '@modules/episode';
import { PodcastEntity } from '@entities/podcast.entity';
import { PodcastDto } from '@dto/podcast.dto';
import { PodcastService } from './podcast.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([PodcastEntity])],
      resolvers: [
        {
          DTOClass: PodcastDto,
          EntityClass: PodcastEntity,
          create: { disabled: true },
        },
      ],
    }),
    LoggerModule.forRoot(),
    QueueModule,
    AuthorModule,
    EpisodeModule,
  ],
  providers: [PodcastService],
  exports: [PodcastService],
})
export class PodcastModule {}
