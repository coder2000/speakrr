import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PodcastEntity } from './podcast.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => PodcastEntity, (podcast) => podcast.categories)
  podcasts: PodcastEntity[];
}
