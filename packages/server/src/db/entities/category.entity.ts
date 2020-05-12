import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PodcastEntity } from './podcast.entity';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => PodcastEntity, (podcast) => podcast.categories)
  @JoinTable()
  podcasts: PodcastEntity[];
}
