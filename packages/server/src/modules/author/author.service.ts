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
    var authors: AuthorEntity[] = await this.query({
      filter: { name: { eq: name } },
    });

    if (authors.length <= 0) {
      var author: AuthorEntity = await this.createOne({ name: name });
    } else {
      var author = authors[0];
    }

    return author;
  }
}
