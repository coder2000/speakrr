import React from 'react';
import { Button, PageHeader, Card, Row, Col } from 'antd';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

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

interface Podcast {
  id: number;
  title: string;
  description: string;
  image: string;
}

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

export function Home() {
  const { loading, error, data } = useQuery<Podcasts>(GET_PODCASTS);

  return (
    <>
      <PageHeader
        title="Speakrr"
        extra={[<Button href="/podcast/add">Add Podcast</Button>]}
      />

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          {data &&
            data.podcasts.edges.map((edge) => (
              <Row gutter={[0, 24]}>
                <Col offset={3} span={18}>
                  <Card title={edge.node.title} key={edge.node.id}>
                    <Row gutter={8}>
                      <Col>
                        <img src={edge.node.image} />
                      </Col>
                      <Col span={20}>{edge.node.description}</Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            ))}
        </>
      )}
    </>
  );
}
