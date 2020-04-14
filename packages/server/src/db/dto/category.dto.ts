import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('Category')
export class CategoryDto {
  @FilterableField()
  id: number;

  @Field()
  name: string;
}
