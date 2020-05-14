import { PageInfo } from "./pageinfo";

export interface Episode {
  id: number;
  title: string;
  description: string;
  duration: string;
  image: string;
}

export interface EpisodeEdge {
  node: Episode;
  cursor: string;
}

export interface EpisodeConnection {
  pageInfo: PageInfo;
  edges: EpisodeEdge[];
}
