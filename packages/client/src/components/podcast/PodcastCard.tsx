import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Grid,
  Typography,
  CardActions,
  Menu,
  MenuItem,
  ListItemIcon,
  Zoom,
  Collapse,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  Favorite as FavoriteIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Podcast } from '../../interfaces';
import EpisodeList from '../episodes';

interface PodcastProps {
  podcast: Podcast;
}

interface DeleteOneInput {
  id: number;
}

interface DeleteResponse {
  id: number;
}

const DELETE_PODCAST = gql`
  mutation deleteOnePodcast($input: DeleteOneInput!) {
    deleteOnePodcast(input: $input) {
      id
    }
  }
`;

const useStyles = makeStyles((theme: Theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto !important',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function PodcastCard(props: PodcastProps) {
  const { podcast } = props;
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [deletePodcast] = useMutation<
    { deleteOnePodcast: DeleteResponse },
    { input: DeleteOneInput }
  >(DELETE_PODCAST);
  const classes = useStyles();

  const handleCardMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCardMenuClose = () => {
    setAnchorElement(null);
  };

  const handleDeleteClick = () => {
    deletePodcast({
      variables: { input: { id: podcast.id } },
    });

    setAnchorElement(null);
    setVisible(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Zoom in={visible} timeout={{ enter: 0, exit: 600 }} unmountOnExit>
        <Grid container spacing={3} key={`podcast-row-${podcast.id}`}>
          <Grid item key={`podcast-col-${podcast.id}`}>
            <Card key={podcast.id} id={`podcast-${podcast.id}`}>
              <CardHeader
                title={podcast.title}
                action={
                  <IconButton onClick={handleCardMenuOpen}>
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Grid container>
                  <Grid item xs={2}>
                    <img
                      src={podcast.image}
                      height="150"
                      width="150"
                      alt="podcast logo"
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body2">
                      {podcast.description}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} unmountOnExit>
                <CardContent>
                  <Typography>Episodes</Typography>
                  <EpisodeList episodes={podcast.episodes} />
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      </Zoom>

      <Menu
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleCardMenuClose}
        id={`podcast-menu-${podcast.id}`}
      >
        <MenuItem onClick={handleCardMenuClose}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <Typography>Remove</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
