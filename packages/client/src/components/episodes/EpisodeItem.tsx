import React from 'react';
import { Episode } from '../../interfaces';
import { Grid, Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';

interface EpisodeItemProps {
  episode: Episode;
}

export function EpisodeItem(props: EpisodeItemProps) {
  const { episode } = props;

  return (
    <Grid container>
      <Grid item>
        <img src={episode.image} height="200" width="200" />
      </Grid>

      <Grid item>
        <Grid container>
          <Grid item>
            <Typography variant="h5">{episode.title}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography variant="body2">
              {ReactHtmlParser(episode.description)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
