import React, { useMemo, useState } from 'react';

import { useGetPlaylists, usePatchPlaylist } from '../../../apis/playlists';
import { useGetTracks } from '../../../apis/tracks';
import Main from '../../../components/Main/Main';
import TrackRow from '../../../components/TrackRow/TrackRow';
import { useTrack } from '../../../stores/useTrack';
import { sortByAlphaAsc } from '../../../utils/generic';

function Tracks() {
  const [openId, setOpenId] = useState('');

  const setTrack = useTrack(state => state.setTrack);
  const isPlaying = useTrack(state => state.isPlaying);
  const currentTrack = useTrack(state => state.track);
  const setIsPlaying = useTrack(state => state.setIsPlaying);

  const patchPlaylist = usePatchPlaylist();
  const { data: tracks = [] } = useGetTracks();
  const { data = [] } = useGetPlaylists();

  const playlists = useMemo(() => data.sort(sortByAlphaAsc('name')), [data]);

  const handlePlay = nextTrack => {
    if (currentTrack?.id === nextTrack.id) {
      setIsPlaying(!isPlaying);
    } else {
      setTrack(nextTrack);
    }
  };

  const handleAddToPlaylist = async (track, playlist) => {
    await patchPlaylist.mutateAsync({
      ...playlist,
      tracks: [...playlist.tracks, track.id]
    });
    setOpenId('');
  };

  const handleAddToPlaylistClick = trackId => {
    setOpenId(trackId === openId ? '' : trackId);
  };

  return (
    <Main>
      {tracks.map((track, index) => (
        <TrackRow
          key={track.id}
          track={track}
          active={isPlaying && track.id === currentTrack?.id}
          handlePlay={handlePlay}
          number={index + 1}
          playlists={playlists}
          isMenuOpen={openId === track.id}
          handleMenu={handleAddToPlaylistClick}
          handleAddToPlaylist={handleAddToPlaylist}
        />
      ))}
    </Main>
  );
}

export default Tracks;
