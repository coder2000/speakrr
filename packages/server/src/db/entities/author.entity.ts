/* eslint-disable import/no-cycle */
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { PodcastEntity } from './podcast.entity';

@Entity('author')
export class AuthorEntity extends BaseEntity {
  @Column()
  name!: string;

  @OneToMany(() => PodcastEntity, (podcast) => podcast.author)
  podcasts!: PodcastEntity[];
}
