import path from 'path';
import winston from 'winston';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { WinstonModule } from 'nest-winston';

import { PodcastModule } from '@modules/podcast';
import { AuthorModule } from '@modules/author';
import { EpisodeModule } from '@modules/episode';
import { CategoryModule } from '@modules/category';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', '..', 'client'),
      exclude: ['/graphql*'],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: false,
      playground: false,
    }),
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'speakrr.log' }),
      ],
    }),
    PodcastModule,
    AuthorModule,
    EpisodeModule,
    CategoryModule,
  ],
})
export class AppModule {}
