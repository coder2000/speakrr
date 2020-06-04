import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Typography } from '@material-ui/core';
import { PageInfo, Podcast } from '../../interfaces';
import { PodcastCard } from './PodcastCard';

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
          {data ? (
            data.podcasts.edges.map((edge) => <PodcastCard podcast={edge.node} key={`podcast-${edge.node.id}`} />)
          ) : (
            <>
              <Typography variant="h5">No Podcasts</Typography>
              <Typography>Add a podcast using the button below.</Typography>
            </>
          )}
        </>
      )}
    </>
  );
}
