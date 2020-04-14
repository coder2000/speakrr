import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Podcast } from './podcast.entity';

@Entity()
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Podcast, (podcast) => podcast.author)
  podcasts: Podcast[];
}
