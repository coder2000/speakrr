import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Container,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { PodcastCard } from './podcast/PodcastCard';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Podcast } from '../interfaces';
import { AddPodcastFab } from './podcast/AddPodcastFab';

const GET_PODCASTS = gql`
  query podcasts {
    podcasts {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }

      edges {
        node {
          id
          title
          description
          image
        }
        cursor
      }
    }
  }
`;

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

interface PodcastEdge {
  node: Podcast;
  cursor: string;
}

interface PodcastConnection {
  pageInfo: PageInfo;
  edges: PodcastEdge[];
}

interface Podcasts {
  podcasts: PodcastConnection;
}

const useStyles = makeStyles((theme: Theme) => ({
  appbar: {
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function Home() {
  const { loading, data } = useQuery<Podcasts>(GET_PODCASTS);
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            color="textSecondary"
          >
            Speakrr
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            {data &&
              data.podcasts.edges.map((edge) => (
                <Grid container spacing={3}>
                  <Grid item>
                    <PodcastCard podcast={edge.node} />
                  </Grid>
                </Grid>
              ))}
          </>
        )}
      </Container>

      <AddPodcastFab />
    </>
  );
}
