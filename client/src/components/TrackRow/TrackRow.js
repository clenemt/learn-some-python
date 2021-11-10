import clsx from 'clsx';
import React from 'react';

import { ReactComponent as List } from '../../assets/list.svg';
import { ReactComponent as Minus } from '../../assets/minus.svg';
import { ReactComponent as Pause } from '../../assets/pause.svg';
import { ReactComponent as Play } from '../../assets/play.svg';
import { duration } from '../../utils/generic';
import styles from './TrackRow.module.css';

function TrackRow({
  track,
  handlePlay,
  active,
  number,
  playlists,
  handleMenu,
  isMenuOpen,
  handleAddToPlaylist,
  handleDeleteFromPlaylist
}) {
  return (
    <div className={clsx(styles.trackRow, active && styles.active)}>
      <button
        type="button"
        className={styles.clickable}
        onClick={() => handlePlay(track)}
        aria-label={`Play "${track.title}"`}
      >
        <span className={styles.trackNumber}>{number}</span>
        <span className={styles.trackPlay}>
          {active ? <Pause /> : <Play />}
        </span>
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
      </button>
      {playlists && (
        <div className={styles.trackAddToPlaylist}>
          <button
            type="button"
            title="Add to playlist"
            aria-label="Add to playlist"
            onClick={() => handleMenu(track.id)}
          >
            <List />
          </button>
          {isMenuOpen && (
            <div className={styles.menu}>
              <p>Add to playlist</p>
              {playlists.map(playlist => (
                <button
                  key={playlist.id}
                  type="button"
                  onClick={() => handleAddToPlaylist(track, playlist)}
                >
                  {playlist.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {handleDeleteFromPlaylist && (
        <button
          type="button"
          className={styles.trackRemoveFromPlaylist}
          title="Remove from playlist"
          aria-label="Remove from playlist"
          onClick={() => handleDeleteFromPlaylist(track.id)}
        >
          <Minus />
        </button>
      )}
      <div className={styles.trackDuration}>{duration(track.length)}</div>
    </div>
  );
}

export default TrackRow;
