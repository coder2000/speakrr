import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { QueueEntity } from '@entities/queue.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([QueueEntity])],
      resolvers: [
        {
          DTOClass: QueueEntity,
          EntityClass: QueueEntity,
          update: { disabled: true },
        },
      ],
    }),
  ],
})
export class QueueModule {}
