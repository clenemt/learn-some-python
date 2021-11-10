import React, { useRef } from 'react';

import { ReactComponent as Pause } from '../../assets/pause.svg';
import { ReactComponent as Play } from '../../assets/play.svg';
import { useTrack } from '../../stores/useTrack';
import styles from './AudioPlayer.module.css';
import { useAudioPlayer } from './useAudioPlayer';

// Simple wrapper bound to the store
function AudioPlayerWrapper() {
  const track = useTrack(state => state.track);
  const isPlaying = useTrack(state => state.isPlaying);
  const setIsPlaying = useTrack(state => state.setIsPlaying);

  return track ? (
    <AudioPlayer
      track={track}
      isPlaying={isPlaying}
      handlePlaying={setIsPlaying}
    />
  ) : null;
}

function AudioPlayer({ track, isPlaying, handlePlaying }) {
  const audioRef = useRef(null);
  const progress = useAudioPlayer(audioRef, track, isPlaying, handlePlaying);

  const handleSliderChange = event => {
    audioRef.current.currentTime =
      (event.target.value / 1000) * audioRef.current.duration;
  };

  const handleTogglePlaybackClick = () => handlePlaying(!isPlaying);

  return (
    <>
      <audio src={track.audio} ref={audioRef} />
      <div className={styles.audioPlayer}>
        <button
          className={styles.togglePlaybackButton}
          onClick={handleTogglePlaybackClick}
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <img
          src={track.cover_art}
          className={styles.trackCover}
          alt="album cover"
          loading="lazy"
          height="40"
        />
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{track.title}</div>
          <div className={styles.trackArtist}>
            {track.main_artists.join(', ')}
          </div>
        </div>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="1"
            max="1000"
            value={progress * 1000}
            className={styles.slider}
            onChange={handleSliderChange}
          />
        </div>
      </div>
    </>
  );
}

export default AudioPlayerWrapper;
