import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetPlaylist } from '../../../apis/playlists';
import Main from '../../../components/Main/Main';

function Playlist() {
  const { playlistId } = useParams();
  const { data: playlist } = useGetPlaylist(playlistId);

  return (
    <Main>
      <h1>Playlist</h1>
      {playlist.name}
    </Main>
  );
}

export default Playlist;
