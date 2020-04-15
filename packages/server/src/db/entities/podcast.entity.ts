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
import { AuthorEntity } from './author.entity';
import { EpisodeEntity } from './episode.entity';
import { CategoryEntity } from './category.entity';

@Entity('podcast')
export class PodcastEntity {
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

  @ManyToOne(() => AuthorEntity, (author) => author.podcasts)
  author: AuthorEntity;

  @OneToMany(() => EpisodeEntity, (episode) => episode.podcast)
  episodes: EpisodeEntity[];

  @ManyToMany(() => CategoryEntity, (category) => category.podcasts)
  categories: CategoryEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  authorId: number;
}
