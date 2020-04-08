import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Author } from './author.entity';
import { Episode } from './episode.entity';
import { Category } from './category.entity';

@Entity()
@ObjectType()
export class Podcast {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
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

  @ManyToOne((type) => Author, (author) => author.podcasts)
  @Field((type) => Author)
  author: Author;

  @OneToMany((type) => Episode, (episode) => episode.podcast)
  @Field((type) => [Episode])
  episodes: Episode[];

  @ManyToMany((type) => Category, (category) => category.podcasts)
  @Field((type) => [Category])
  categories: Category[];
}
