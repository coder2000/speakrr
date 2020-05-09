import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { InjectQueryService, QueryService } from '@nestjs-query/core';

import { QueueEntity } from '@entities/queue.entity';

@Resolver(() => QueueEntity)
export class QueueResolver extends CRUDResolver(QueueEntity, {
  update: { disabled: true },
}) {
  constructor(
    @InjectQueryService(QueueEntity)
    readonly queueService: QueryService<QueueEntity>,
  ) {
    super(queueService);
  }
}
