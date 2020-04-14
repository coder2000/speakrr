import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @ManyToOne(() => Author, (author) => author.podcasts)
  author: Author;

  @OneToMany(() => Episode, (episode) => episode.podcast)
  episodes: Episode[];

  @ManyToMany(() => Category, (category) => category.podcasts)
  categories: Category[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
