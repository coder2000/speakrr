/* eslint-disable import/no-cycle */
import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { FilterableField, Relation as One } from '@nestjs-query/query-graphql';
import { PodcastDto } from './podcast.dto';

@ObjectType('Episode')
@One('podcast', () => PodcastDto, { disableUpdate: true })
export class EpisodeDto {
  @FilterableField()
  id!: number;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  url!: string;

  @Field({ nullable: true })
  image!: string;

  @Field()
  type!: string;

  @Field()
  filesize!: number;

  @FilterableField()
  explicit!: boolean;

  @Field()
  guid!: string;

  @Field()
  duration!: string;

  @Field(() => GraphQLISODateTime)
  publication!: Date;

  @FilterableField()
  podcastId!: number;
}
