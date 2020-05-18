import React from 'react';
import { Grid, GridProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { EpisodeConnection } from '../../interfaces';
import { EpisodeItem } from './EpisodeItem';

interface EpisodeListProps {
  episodes: EpisodeConnection;
}

interface StyleProps {
  backgroundImage: string;
}

const useStyles = makeStyles(() => ({
  episode: {
    flexGrow: 1,
    '&:before': {
      content: ' ',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundImage: (props: StyleProps) => `url(${props.backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '50% 0',
      opacity: 0.6,
      zIndex: 1,
    },
  },
}));

function GridBackground(props: StyleProps & Omit<GridProps, keyof StyleProps>) {
  const { backgroundImage, children, ...other } = props;
  const classes = useStyles({ backgroundImage });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Grid className={classes.episode} {...other}>
      {children}
    </Grid>
  );
}

export function EpisodeList(props: EpisodeListProps) {
  const { episodes } = props;

  return (
    <>
      {episodes ? (
        episodes.edges.map((episode) => (
          <GridBackground
            backgroundImage={episode.node.image}
            container
            key={`episode-row-${episode.node.id}`}
          >
            <Grid item key={`episode-col-${episode.node.id}`} xs>
              <EpisodeItem episode={episode.node} />
            </Grid>
          </GridBackground>
        ))
      ) : (
        <h2>No Episodes</h2>
      )}
    </>
  );
}
