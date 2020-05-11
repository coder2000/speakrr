import { PageInfo } from './pageinfo';

export interface Episode {
  id: Number;
  title: String;
  description: String;
  duration: String;
  image: String;
}

export interface EpisodeEdge {
  node: Episode;
  cursor: String;
}

export interface EpisodeConnection {
  pageInfo: PageInfo;
  edges: EpisodeEdge[];
}
