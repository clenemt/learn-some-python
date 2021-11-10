import React from 'react';

import { useGetTracks } from '../../../apis/tracks';
import Main from '../../../components/Main/Main';
import TrackRow from '../../../components/TrackRow/TrackRow';
import { useTrack } from '../../../stores/useTrack';

function Tracks() {
  const isPlaying = useTrack(state => state.isPlaying);
  const currentTrack = useTrack(state => state.track);
  const setIsPlaying = useTrack(state => state.setIsPlaying);
  const setTrack = useTrack(state => state.setTrack);
  const { data: tracks = [] } = useGetTracks();

  const handlePlay = nextTrack => {
    if (currentTrack.id === nextTrack.id) {
      setIsPlaying(!isPlaying);
    } else {
      setTrack(nextTrack);
    }
  };

  return (
    <Main>
      {tracks.map((track, index) => (
        <TrackRow
          key={track.id}
          track={track}
          active={isPlaying && track.id === currentTrack.id}
          handlePlay={handlePlay}
          number={index + 1}
        />
      ))}
    </Main>
  );
}

export default Tracks;
