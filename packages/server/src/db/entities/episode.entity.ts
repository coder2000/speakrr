import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';
import { Podcast } from './podcast.entity';

@Entity()
@ObjectType()
export class Episode {
  @PrimaryGeneratedColumn()
  @FilterableField()
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  url: string;

  @Column()
  @Field()
  image: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  filesize: number;

  @Column()
  @Field()
  explicit: boolean;

  @Column()
  @Field()
  guid: string;

  @Column()
  @Field()
  duration: string;

  @Column()
  @Field()
  publication: Date;

  @ManyToOne((type) => Podcast, (podcast) => podcast.episodes)
  @Field((type) => Podcast)
  podcast: Podcast;
}
