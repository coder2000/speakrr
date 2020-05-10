import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Fab,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Favorite as FavoriteIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';
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

const useStyles = makeStyles((theme: Theme) => ({
  appbar: {
    marginBottom: theme.spacing(2),
  },
  fab: {
    margin: 0,
    top: 'auto',
    left: 'auto',
    bottom: 20,
    right: 20,
    position: 'fixed',
  },
  title: {
    flexGrow: 1,
  },
}));

export function Home() {
  const { loading, data } = useQuery<Podcasts>(GET_PODCASTS);
  const classes = useStyles();
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const handleCardMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCardMenuClose = () => {
    setAnchorElement(null);
  };

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
                    <Card key={edge.node.id}>
                      <CardHeader
                        title={edge.node.title}
                        action={
                          <IconButton onClick={handleCardMenuOpen}>
                            <MoreVertIcon />
                          </IconButton>
                        }
                      />
                      <CardContent>
                        <Grid container>
                          <Grid item xs={2}>
                            <img src={edge.node.image} />
                          </Grid>
                          <Grid item xs={10}>
                            <Typography variant="body2">
                              {edge.node.description}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions>
                        <IconButton>
                          <FavoriteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              ))}
          </>
        )}

        <Menu
          anchorEl={anchorElement}
          keepMounted={true}
          open={Boolean(anchorElement)}
          onClose={handleCardMenuClose}
        >
          <MenuItem onClick={handleCardMenuClose}>Edit</MenuItem>
          <MenuItem onClick={handleCardMenuClose}>Remove</MenuItem>
        </Menu>

        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
}
