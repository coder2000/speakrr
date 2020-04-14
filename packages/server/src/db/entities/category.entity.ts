import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Podcast } from './podcast.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Podcast, (podcast) => podcast.categories)
  podcasts: Podcast[];
}
