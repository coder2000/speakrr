/* eslint-disable import/no-cycle */
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Connection as Many,
  FilterableField,
  Relation as One,
} from '@nestjs-query/query-graphql';
import { AuthorDto } from './author.dto';
import { CategoryDto } from './category.dto';
import { EpisodeDto } from './episode.dto';

@ObjectType('Podcast')
@One('author', () => AuthorDto, { disableUpdate: true, disableRemove: true })
@Many('categories', () => CategoryDto, { disableUpdate: true })
@Many('episodes', () => EpisodeDto, { disableUpdate: true })
export class PodcastDto {
  @FilterableField()
  id!: number;

  @FilterableField()
  title!: string;

  @Field()
  description!: string;

  @Field()
  image!: string;

  @Field()
  language!: string;

  @Field()
  link!: string;

  @FilterableField()
  explicit!: boolean;

  @FilterableField()
  authorId!: number;
}
