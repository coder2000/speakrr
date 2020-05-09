import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { AuthorEntity } from '@entities/author.entity';
import { AuthorService } from './author.service';
import { AuthorDto } from '@dto/author.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([AuthorEntity])],
      resolvers: [
        {
          DTOClass: AuthorDto,
          EntityClass: AuthorEntity,
          create: { disabled: true },
        },
      ],
    }),
  ],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
