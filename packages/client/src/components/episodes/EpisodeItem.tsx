import React from 'react';
import { Episode } from '../../interfaces';

interface EpisodeItemProps {
  episode: Episode;
}

export function EpisodeItem(props: EpisodeItemProps) {
  const { episode } = props;

  return <h4>{episode.title}</h4>;
}
