import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Podcast } from '../../interfaces';
import { Grid } from '@material-ui/core';
import { PodcastCard } from './PodcastCard';

interface PageInfo {
  hasNextPage: Boolean;
  endCursor: String;
}

interface PodcastEdge {
  node: Podcast;
  cursor: String;
}

interface PodcastConnection {
  pageInfo: PageInfo;
  edges: PodcastEdge[];
}

interface Podcasts {
  podcasts: PodcastConnection;
}

const GET_PODCASTS = gql`
  query podcasts {
    podcasts {
      pageInfo {
        hasNextPage
        endCursor
      }

      edges {
        node {
          id
          title
          description
          image
          episodes {
            edges {
              node {
                id
                title
                description
                image
                duration
              }
            }
          }
        }
        cursor
      }
    }
  }
`;

export function PodcastList() {
  const { loading, data } = useQuery<Podcasts>(GET_PODCASTS);

  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          {data &&
            data.podcasts.edges.map((edge) => (
              <Grid container spacing={3} key={`podcast-row-${edge.node.id}`}>
                <Grid item key={`podcast-col-${edge.node.id}`}>
                  <PodcastCard podcast={edge.node} />
                </Grid>
              </Grid>
            ))}
        </>
      )}
    </>
  );
}
