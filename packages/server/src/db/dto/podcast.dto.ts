import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Podcast')
export class PodcastDto {
  @FilterableField()
  id: number;

  @FilterableField()
  title: string;

  @Field()
  description: string;

  @Field()
  image: string;

  @Field()
  language: string;

  @Field()
  link: string;

  @FilterableField()
  explicit: boolean;

  @FilterableField()
  authorId: number;
}
