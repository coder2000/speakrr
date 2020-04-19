import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PodcastEntity } from './podcast.entity';

@Entity('episode')
export class EpisodeEntity {
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
  filesize: number;

  @Column()
  explicit: boolean;

  @Column()
  guid: string;

  @Column()
  duration: string;

  @Column(() => Date)
  publication: Date;

  @ManyToOne(() => PodcastEntity, (podcast) => podcast.episodes)
  podcast: PodcastEntity;

  @Column({ nullable: true })
  podcastId: number;
}
