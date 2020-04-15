import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { QueueEntity } from '@entities/queue.entity';
import { QueueResolver } from './queue.resolver';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([QueueEntity])],
  providers: [QueueResolver],
  exports: [NestjsQueryTypeOrmModule],
})
export class QueueModule {}
