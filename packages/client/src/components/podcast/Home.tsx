import React from 'react';
import { Button, PageHeader, Card, Row, Col } from 'antd';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { DeleteOutlined, FolderOpenOutlined } from '@ant-design/icons';

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

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export function Home() {
  const { loading, data } = useQuery<Podcasts>(GET_PODCASTS);
  const classes = useStyles();

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Speakrr
          </Typography>
        </Toolbar>
      </AppBar>

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          {data &&
            data.podcasts.edges.map((edge) => (
              <Row gutter={[0, 24]}>
                <Col offset={3} span={18}>
                  <Card
                    title={edge.node.title}
                    key={edge.node.id}
                    actions={[
                      <DeleteOutlined key="delete" />,
                      <FolderOpenOutlined key="open" />,
                    ]}
                  >
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
