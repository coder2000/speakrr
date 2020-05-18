import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import { AddPodcastFab, PodcastList } from './podcast';

const useStyles = makeStyles((theme: Theme) => ({
  appbar: {
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function Home() {
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
        <PodcastList />
      </Container>

      <AddPodcastFab />
    </>
  );
}
