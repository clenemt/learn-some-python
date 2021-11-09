import React from 'react';

import { useGetPlaylists } from '../../../apis/playlists';
import Main from '../../../components/Main/Main';

function Playlists() {
  const { data: playlists = [] } = useGetPlaylists();
  return <Main>{playlists.map(playlist => playlist.name)}</Main>;
}

export default Playlists;
