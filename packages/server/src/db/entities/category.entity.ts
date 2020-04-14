import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { Podcast } from './podcast.entity';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @FilterableField()
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Podcast, (podcast) => podcast.categories)
  @Field(() => [Podcast])
  podcasts: Podcast[];
}
