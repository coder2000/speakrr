import { Episode } from './episode';

export interface Podcast {
  id: number;
  title: string;
  description: string;
  image: string;
  episodes: Episode[];
}
