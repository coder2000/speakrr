import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { QueryService } from '@nestjs-query/core';
import { InjectTypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { QueueEntity } from '@entities/queue.entity';

@Resolver(() => QueueEntity)
export class QueueResolver extends CRUDResolver(QueueEntity, {
  update: { disabled: true },
}) {
  constructor(
    @InjectTypeOrmQueryService(QueueEntity)
    readonly queueService: QueryService<QueueEntity>,
  ) {
    super(queueService);
  }
}
