import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { CategoryEntity } from '@entities/category.entity';
import { CategoryDto } from '@dto/category.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([CategoryEntity])],
      resolvers: [
        {
          DTOClass: CategoryDto,
          EntityClass: CategoryEntity,
          create: { disabled: true },
        },
      ],
    }),
  ],
})
export class CategoryModule {}
