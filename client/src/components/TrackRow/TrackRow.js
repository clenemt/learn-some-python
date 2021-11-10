import clsx from 'clsx';
import React from 'react';

import { ReactComponent as Pause } from '../../assets/pause.svg';
import { ReactComponent as Play } from '../../assets/play.svg';
import { duration } from '../../utils/generic';
import styles from './TrackRow.module.css';

function TrackRow({ track, handlePlay, active, number }) {
  return (
    <button
      className={clsx(styles.trackRow, active && styles.active)}
      onClick={() => handlePlay(track)}
    >
      <span className={styles.trackNumber}>{number}</span>
      <span className={styles.trackPlay}>{active ? <Pause /> : <Play />}</span>
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
      <div className={styles.trackDuration}>{duration(track.length)}</div>
    </button>
  );
}

export default TrackRow;
