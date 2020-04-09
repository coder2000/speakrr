import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  completed: boolean;
}
