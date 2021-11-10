import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useDeletePlaylist, useGetPlaylist } from '../../../apis/playlists';
import { useGetTracks } from '../../../apis/tracks';
import Button from '../../../components/Button/Button';
import Main from '../../../components/Main/Main';
import { Modal } from '../../../components/Modal/Modal';
import TrackRow from '../../../components/TrackRow/TrackRow';
import { useTrack } from '../../../stores/useTrack';
import styles from './Playlist.module.css';

function Playlist() {
  const { playlistId } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { data: allTracks = [] } = useGetTracks();
  const deletePlaylist = useDeletePlaylist();
  const { data: playlist } = useGetPlaylist(playlistId);

  const setTrack = useTrack(state => state.setTrack);
  const isPlaying = useTrack(state => state.isPlaying);
  const currentTrack = useTrack(state => state.track);
  const setIsPlaying = useTrack(state => state.setIsPlaying);

  const tracks = useMemo(
    () => allTracks.filter(track => playlist?.tracks.includes(track.id)),
    [allTracks, playlist]
  );

  const handlePlay = nextTrack => {
    if (currentTrack?.id === nextTrack.id) {
      setIsPlaying(!isPlaying);
    } else {
      setTrack(nextTrack);
    }
  };

  const handleDeletePlaylist = async event => {
    event.preventDefault();
    await deletePlaylist.mutateAsync(playlistId);
    navigate('/playlists');
    setOpen(false);
  };

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Main>
      <Modal open={open} onClose={handleClose}>
        <form onSubmit={handleDeletePlaylist}>
          <h3>Delete playlist</h3>

          <p>
            You are about to delete the playlist{' '}
            <strong>"{playlist?.name}"</strong>. Are you sure?
          </p>

          <div className="t-right">
            <Button
              type="submit"
              variant="primary"
              className="mr-2"
              loading={deletePlaylist.isLoading}
            >
              Delete it
            </Button>
            <Button onClick={handleClose}>Nope</Button>
          </div>
        </form>
      </Modal>

      <div className={styles.actions}>
        <Link className={styles.back} to="/playlists">
          ← Back to playlists
        </Link>
        <Button onClick={handleClick}>Delete playlist</Button>
      </div>
      <h1>{playlist?.name || ''}</h1>
      {tracks.length ? (
        <ul className={styles.playlists}>
          {tracks.map((track, index) => (
            <TrackRow
              key={track.id}
              track={track}
              active={isPlaying && track.id === currentTrack?.id}
              handlePlay={handlePlay}
              number={index + 1}
            />
          ))}
        </ul>
      ) : (
        <>
          <p>This looks awfully empty 😅.</p>
          <Link to="/">Let's add some tracks.</Link>
        </>
      )}
    </Main>
  );
}

export default Playlist;
