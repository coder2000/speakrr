import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Podcast } from './podcast.entity';

@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany((type) => Podcast, (podcast) => podcast.author)
  @Field((type) => [Podcast])
  podcasts: Podcast[];
}
