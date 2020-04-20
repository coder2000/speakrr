import path from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule, PinoLogger } from 'nestjs-pino';

import { PodcastModule } from '@modules/podcast';
import { AuthorModule } from '@modules/author';
import { EpisodeModule } from '@modules/episode';
import { CategoryModule } from '@modules/category';
import { QueueModule } from '@modules/queue';
import { TypeOrmPinoLogger } from './TypeOrmPinoLogger';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [LoggerModule],
      inject: [PinoLogger],
      useFactory: (logger: PinoLogger) => {
        logger.setContext('TypeOrm');
        return {
          type: 'sqlite',
          database: 'database.sqlite',
          autoLoadEntities: true,
          synchronize: false,
          logging: true,
          logger: new TypeOrmPinoLogger(logger),
        };
      },
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
    PodcastModule,
    AuthorModule,
    EpisodeModule,
    CategoryModule,
    QueueModule,
  ],
})
export class AppModule {}
