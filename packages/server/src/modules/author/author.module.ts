import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { AuthorEntity } from '@entities/author.entity';
import { AuthorDto } from '@dto/author.dto';
import { AuthorService } from './author.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([AuthorEntity])],
      resolvers: [
        {
          DTOClass: AuthorDto,
          EntityClass: AuthorEntity,
          ServiceClass: AuthorService,
          create: { disabled: true },
        },
      ],
      services: [AuthorService],
    }),
  ],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
