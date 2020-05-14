import React from "react";
import { Grid, Typography } from "@material-ui/core";
import parse from "html-react-parser";
import { Episode } from "../../interfaces";

interface EpisodeItemProps {
  episode: Episode;
}

export default function EpisodeItem(props: EpisodeItemProps) {
  const { episode } = props;

  return (
    <>
      <Grid container>
        <Grid item xs>
          <Typography variant="h5">{episode.title}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs>
          <Typography variant="body2" component="span">
            {parse(episode.description)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
