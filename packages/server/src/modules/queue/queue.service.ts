import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueEntity } from '@entities/queue.entity';

@QueryService(QueueEntity)
export class QueueService extends TypeOrmQueryService<QueueEntity> {
  constructor(
    @InjectRepository(QueueEntity) queueRepository: Repository<QueueEntity>,
  ) {
    super(queueRepository);
  }
}
