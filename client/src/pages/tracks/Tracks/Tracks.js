import React, { useState } from 'react';

import { useGetTracks } from '../../../apis/tracks';
import TrackRow from '../../../components/TrackRow/TrackRow';
import AudioPlayer from '../../../components/AudioPlayer/AudioPlayer';
import Main from '../../../components/Main/Main';

function Tracks() {
  const [currentTrack, setCurrentTrack] = useState();
  const { data: tracks = [] } = useGetTracks();

  const handlePlay = track => setCurrentTrack(track);

  return (
    <Main>
      {tracks.map((track, ix) => (
        <TrackRow key={ix} track={track} handlePlay={handlePlay} />
      ))}
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </Main>
  );
}

export default Tracks;
