import path from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule, PinoLogger } from 'nestjs-pino';

import { PodcastModule } from '@modules/podcast';
import { AuthorModule } from '@modules/author';
import { EpisodeModule } from '@modules/episode';
import { CategoryModule } from '@modules/category';
import { QueueModule } from '@modules/queue';
import { TypeOrmPinoLogger } from './TypeOrmPinoLogger';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [
        LoggerModule.forRoot({ pinoHttp: { level: 'debug' } }),
        ConfigModule,
      ],
      inject: [PinoLogger, ConfigService],
      useFactory: (logger: PinoLogger, config: ConfigService) => {
        logger.setContext('TypeOrm');
        return {
          type: 'postgres' as 'postgres',
          database: config.get<string>('DATABASE_SCHEMA', 'speakrr'),
          host: config.get<string>('DATABASE_HOST', 'localhost'),
          port: config.get<number>('DATABASE_PORT', 5432),
          username: config.get<string>('DATABASE_USERNAME', 'speakrr'),
          password: config.get<string>('DATABASE_PASSWORD', 'speakrr'),
          autoLoadEntities: true,
          synchronize: false,
          migrationsRun: true,
          migrations: ['**/migrations/*.js'],
          logging: 'all',
          logger: new TypeOrmPinoLogger(logger),
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', '..', 'client'),
      exclude: ['/graphql*'],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
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
