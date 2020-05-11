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
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Favorite as FavoriteIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';
import { Podcast } from '../../interfaces';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

interface PodcastProps {
  podcast: Podcast;
}

interface DeleteOneInput {
  id: Number;
}

interface DeleteResponse {
  id: Number;
}

const DELETE_PODCAST = gql`
  mutation deleteOnePodcast($input: DeleteOneInput!) {
    deleteOnePodcast(input: $input) {
      id
    }
  }
`;

export function PodcastCard(props: PodcastProps) {
  const { podcast } = props;
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  const [deletePodcast, {}] = useMutation<
    { deleteOnePodcast: DeleteResponse },
    { input: DeleteOneInput }
  >(DELETE_PODCAST);

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

  return (
    <>
      <Zoom in={visible} timeout={{ enter: 0, exit: 600 }} unmountOnExit>
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
                <img src={podcast.image} height="150" width="150" />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body2">{podcast.description}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Zoom>

      <Menu
        anchorEl={anchorElement}
        keepMounted={true}
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
