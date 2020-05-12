import { Column, Entity } from 'typeorm';
import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';

@Entity('queue')
@ObjectType('Queue')
export class QueueEntity extends BaseEntity {
  @FilterableField()
  id: number;

  @Column()
  @Field()
  url: string;

  @Column({ nullable: true, default: false })
  @FilterableField({ nullable: true })
  completed?: boolean;
}
