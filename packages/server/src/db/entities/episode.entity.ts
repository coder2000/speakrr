import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Podcast } from './podcast.entity';

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  image: string;

  @Column()
  type: string;

  @Column()
  filesisze: number;

  @Column()
  explicit: boolean;

  @Column()
  guid: string;

  @Column()
  duration: string;

  @Column()
  publication: Date;

  @ManyToOne((type) => Podcast, (podcast) => podcast.episodes)
  podcast: Podcast;
}
