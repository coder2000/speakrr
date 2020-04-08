import path from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodcastModule } from '@modules/podcast';

import { Podcast } from '@entities/podcast.entity';
import { Author } from '@entities/author.entity';
import { Category } from '@entities/category.entity';
import { Episode } from '@entities/episode.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Author, Category, Episode, Podcast],
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
    PodcastModule,
  ],
})
export class AppModule {}
