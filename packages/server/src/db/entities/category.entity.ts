import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { PodcastEntity } from './podcast.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => PodcastEntity, (podcast) => podcast.categories)
  @JoinTable()
  podcasts: PodcastEntity[];
}
