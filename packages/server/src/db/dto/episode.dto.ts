import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Episode')
export class EpisodeDto {
  @FilterableField()
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  url: string;

  @Field()
  image: string;

  @Field()
  type: string;

  @Field()
  filesize: number;

  @FilterableField()
  explicit: boolean;

  @Field()
  guid: string;

  @Field()
  duration: string;

  @Field()
  publication: Date;

  @FilterableField()
  podcastId: number;
}
