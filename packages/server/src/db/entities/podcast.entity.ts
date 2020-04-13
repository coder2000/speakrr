import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Author } from './author.entity';
import { Episode } from './episode.entity';
import { Category } from './category.entity';

@Entity()
@ObjectType()
export class Podcast {
  @PrimaryGeneratedColumn()
  @FilterableField()
  id: number;

  @Column()
  @FilterableField()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  image: string;

  @Column()
  @Field()
  language: string;

  @Column()
  @Field()
  link: string;

  @Column()
  @Field()
  explicit: boolean;

  @ManyToOne(() => Author, (author) => author.podcasts)
  @Field(() => Author)
  author: Author;

  @OneToMany(() => Episode, (episode) => episode.podcast)
  @Field(() => [Episode])
  episodes: Episode[];

  @ManyToMany(() => Category, (category) => category.podcasts)
  @Field(() => [Category])
  categories: Category[];

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
