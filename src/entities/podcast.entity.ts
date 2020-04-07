import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from './author.entity';
import { Episode } from './episode.entity';
import { Category } from './category.entity';

@Entity()
export class Podcast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  language: string;

  @Column()
  link: string;

  @Column()
  explicit: boolean;

  @ManyToOne((type) => Author, (author) => author.podcasts)
  author: Author;

  @OneToMany((type) => Episode, (episode) => episode.podcast)
  episodes: Episode[];

  @ManyToMany((type) => Category, (category) => category.podcasts)
  categories: Category[];
}
