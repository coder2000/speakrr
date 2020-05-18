/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PodcastEntity } from './podcast.entity';

@Entity('episode')
export class EpisodeEntity extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  url!: string;

  @Column({ nullable: true })
  image?: string;

  @Column()
  type!: string;

  @Column()
  filesize!: number;

  @Column()
  explicit!: boolean;

  @Column()
  guid!: string;

  @Column()
  duration!: string;

  @Column()
  publication!: Date;

  @ManyToOne(() => PodcastEntity, (podcast) => podcast.episodes)
  podcast!: PodcastEntity;

  @Column({ nullable: true })
  podcastId?: number;
}
