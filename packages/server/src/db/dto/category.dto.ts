import { Field, ObjectType } from '@nestjs/graphql';
import {
  Connection as Many,
  FilterableField,
} from '@nestjs-query/query-graphql';
import { PodcastDto } from './podcast.dto';

@ObjectType('Category')
@Many('podcasts', () => PodcastDto, { disableUpdate: true })
export class CategoryDto {
  @FilterableField()
  id: number;

  @Field()
  name: string;
}
