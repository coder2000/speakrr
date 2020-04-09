import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '@entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
})
export class AuthorModule {}
