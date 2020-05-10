import React, { useState } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    margin: 0,
    top: 'auto',
    left: 'auto',
    bottom: 20,
    right: 20,
    position: 'fixed',
  },
}));

type FormData = {
  podcastUrl: string;
};

const ADD_PODCAST = gql`
  mutation createOneQueue($input: CreateOneQueueInput!) {
    createOneQueue(input: $input) {
      id
    }
  }
`;

interface Queue {
  url: string;
}

interface CreateOneQueueInput {
  queue: Queue;
}

export function AddPodcastFab() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();
  const [addPodcast, {}] = useMutation<
    { createOneQueue: Queue },
    { input: CreateOneQueueInput }
  >(ADD_PODCAST);

  const handleOpenClick = () => {
    setOpen(true);
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  const onSubmit = (data: FormData) => {
    addPodcast({ variables: { input: { queue: { url: data.podcastUrl } } } });
    setOpen(false);
  };

  return (
    <>
      <Fab color="primary" className={classes.fab} onClick={handleOpenClick}>
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleCloseClick}>
        <DialogTitle>Add Podcast</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              label="Podcast URL"
              inputRef={register({ required: true })}
              name="podcastUrl"
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
