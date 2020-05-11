import React from 'react';
import { EpisodeConnection } from '../../interfaces';
import { Grid } from '@material-ui/core';
import { EpisodeItem } from './EpisodeItem';

interface EpisodeListProps {
  episodes: EpisodeConnection;
}

export function EpisodeList(props: EpisodeListProps) {
  const { episodes } = props;

  return (
    <>
      {episodes ? (
        episodes.edges.map((episode) => (
          <Grid container key={`episode-row-${episode.node.id}`}>
            <Grid item key={`episode-col-${episode.node.id}`}>
              <EpisodeItem episode={episode.node} />
            </Grid>
          </Grid>
        ))
      ) : (
        <h2>No Episodes</h2>
      )}
    </>
  );
}
