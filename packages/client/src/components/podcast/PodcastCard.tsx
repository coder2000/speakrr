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
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Favorite as FavoriteIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';
import { Podcast } from '../../interfaces';

interface PodcastProps {
  podcast: Podcast;
}

export function PodcastCard(props: PodcastProps) {
  const { podcast } = props;
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const handleCardMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCardMenuClose = () => {
    setAnchorElement(null);
  };

  return (
    <>
      <Card key={podcast.id}>
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
        <MenuItem onClick={handleCardMenuClose}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <Typography>Remove</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
