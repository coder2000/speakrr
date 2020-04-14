import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PodcastEntity } from './podcast.entity';

@Entity()
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PodcastEntity, (podcast) => podcast.author)
  podcasts: PodcastEntity[];
}
