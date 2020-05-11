import React from 'react';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';

interface EpisodeProps {
  podcastId: Number;
}

export function EpisodeList(props: EpisodeProps) {}
