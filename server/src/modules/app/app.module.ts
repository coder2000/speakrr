import path from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodcastModule } from '@modules/podcast';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
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
