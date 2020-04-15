import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsFQDN } from 'class-validator';

@Entity('queue')
@ObjectType('Queue')
export class QueueEntity {
  @PrimaryGeneratedColumn()
  @FilterableField()
  id: number;

  @Column()
  @Field()
  @IsFQDN()
  url: string;

  @Column({ nullable: true })
  @FilterableField({ nullable: true })
  completed?: boolean;
}
