import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { QueryService } from '@nestjs-query/core';
import { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Queue } from '@entities/queue.entity';

@Resolver(() => Queue)
export class QueueResolver extends CRUDResolver(Queue, {
  update: { disabled: true },
}) {
  constructor(
    @InjectTypeOrmQueryService(Queue)
    readonly queueService: QueryService<Queue>,
  ) {
    super(queueService);
  }
}
