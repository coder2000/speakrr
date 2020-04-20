import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { QueueEntity } from '@entities/queue.entity';
import { QueueResolver } from './queue.resolver';
import { QueueService } from './queue.service';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([QueueEntity])],
  providers: [QueueResolver, QueueService],
  exports: [QueueService],
})
export class QueueModule {}
