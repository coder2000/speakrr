import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Queue {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  url: string;

  @Column({ nullable: true })
  @Field()
  completed?: boolean;
}
