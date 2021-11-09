import { useQuery } from 'react-query';

import { axios, queryClient } from './utils';

const PLAYLISTS_KEY = 'playlists';

const getPlaylist = async playlistId => {
  const { data } = await axios.get(`playlists/${playlistId}`);
  return data;
};

const getPlaylists = async playlistId => {
  const { data } = await axios.get(`playlists`);
  return data;
};

export const useGetPlaylists = () => useQuery(PLAYLISTS_KEY, getPlaylists);

export const useGetPlaylist = playlistId =>
  useQuery([PLAYLISTS_KEY, playlistId], () => getPlaylist(playlistId), {
    initialData: () =>
      queryClient
        .getQueryData(PLAYLISTS_KEY)
        ?.find(playlist => playlist.id === playlistId),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(PLAYLISTS_KEY)?.dataUpdatedAt
  });
