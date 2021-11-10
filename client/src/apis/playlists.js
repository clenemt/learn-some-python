import { useMutation, useQuery } from 'react-query';

import { axios, queryClient } from './utils';

const PLAYLISTS_KEY = 'playlists';

const getPlaylist = async playlistId => {
  const { data } = await axios.get(`playlists/${playlistId}`);
  return data;
};

const getPlaylists = async playlistId => {
  const { data } = await axios.get('playlists');
  return data;
};

const postPlaylist = async ({ name }) => {
  const { data } = await axios.post('playlists/', {
    name
  });
  return data;
};

const patchPlaylist = async playlist => {
  const { data } = await axios.patch(`playlists/${playlist.id}/`, playlist);
  return data;
};

const deletePlaylist = async playlistId => {
  const { data } = await axios.delete(`playlists/${playlistId}`);
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

export const useCreatePlaylist = () =>
  useMutation(playlist => postPlaylist(playlist), {
    onSuccess: async newPlaylist => {
      queryClient.setQueryData(PLAYLISTS_KEY, playlists => [
        ...playlists,
        newPlaylist
      ]);
    }
  });

export const useDeletePlaylist = () =>
  useMutation(playlistId => deletePlaylist(playlistId), {
    onSuccess: (data, playlistId) => {
      queryClient.setQueryData(PLAYLISTS_KEY, playlists =>
        playlists.filter(playlist => playlist.id !== playlistId)
      );
    }
  });

export const usePatchPlaylist = () =>
  useMutation(playlist => patchPlaylist(playlist), {
    onSuccess: updatedPlaylist => {
      queryClient.setQueryData(PLAYLISTS_KEY, playlists =>
        playlists.map(playlist =>
          playlist.id === updatedPlaylist.id ? updatedPlaylist : playlist
        )
      );
    }
  });
