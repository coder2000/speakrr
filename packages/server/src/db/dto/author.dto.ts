import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Author')
export class AuthorDto {
  @FilterableField()
  id: number;

  @Field()
  name: string;
}
