import React from 'react';

import { useGetTracks } from '../../../apis/tracks';
import TrackRow from '../../../components/TrackRow/TrackRow';
import Main from '../../../components/Main/Main';
import { useTrack } from '../../../stores/useTrack';

function Tracks() {
  const setTrack = useTrack(state => state.setTrack);
  const { data: tracks = [] } = useGetTracks();

  return (
    <Main>
      {tracks.map((track, ix) => (
        <TrackRow key={ix} track={track} handlePlay={setTrack} />
      ))}
    </Main>
  );
}

export default Tracks;
