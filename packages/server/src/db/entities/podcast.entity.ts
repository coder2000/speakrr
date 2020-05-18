/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AuthorEntity } from './author.entity';
import { EpisodeEntity } from './episode.entity';
import { CategoryEntity } from './category.entity';

@Entity('podcast')
export class PodcastEntity extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  image!: string;

  @Column()
  language!: string;

  @Column()
  link!: string;

  @Column()
  explicit!: boolean;

  @ManyToOne(() => AuthorEntity, (author) => author.podcasts)
  author!: AuthorEntity;

  @OneToMany(() => EpisodeEntity, (episode) => episode.podcast)
  episodes!: EpisodeEntity[];

  @ManyToMany(() => CategoryEntity, (category) => category.podcasts)
  categories!: CategoryEntity[];

  @Column({ nullable: true })
  authorId?: number;
}
