/* eslint-disable import/no-cycle */
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Connection as Many,
  FilterableField,
} from '@nestjs-query/query-graphql';
import { PodcastDto } from './podcast.dto';

@ObjectType('Author')
@Many('podcasts', () => PodcastDto, {
  disableRemove: true,
  disableUpdate: true,
})
export class AuthorDto {
  @FilterableField()
  id!: number;

  @Field()
  name!: string;
}
