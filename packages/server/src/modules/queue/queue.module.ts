import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Queue } from '@entities/queue.entity';
import { QueueResolver } from './queue.resolver';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([Queue])],
  providers: [QueueResolver],
  exports: [NestjsQueryTypeOrmModule],
})
export class QueueModule {}
