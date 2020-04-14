import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '@entities/author.entity';

@QueryService(Author)
export class AuthorService extends TypeOrmQueryService<Author> {
  constructor(@InjectRepository(Author) authorRepository: Repository<Author>) {
    super(authorRepository);
  }
}
