import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthorEntity } from '@entities/author.entity';

@QueryService(AuthorEntity)
export class AuthorService extends TypeOrmQueryService<AuthorEntity> {
  constructor(
    @InjectRepository(AuthorEntity) authorRepository: Repository<AuthorEntity>,
  ) {
    super(authorRepository);
  }

  async findOrCreate(name: string): Promise<AuthorEntity> {
    const authors: AuthorEntity[] = await this.query({
      filter: { name: { eq: name } },
    });

    let author: AuthorEntity;

    if (authors.length <= 0) {
      author = await this.createOne({ name: name });
    } else {
      author = authors[0];
    }

    return author;
  }
}
