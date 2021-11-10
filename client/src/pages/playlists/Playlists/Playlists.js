import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useCreatePlaylist, useGetPlaylists } from '../../../apis/playlists';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Main from '../../../components/Main/Main';
import { Modal } from '../../../components/Modal/Modal';
import { elapsed, sortByDateDesc } from '../../../utils/generic';
import styles from './Playlists.module.css';

function Playlists() {
  const [open, setOpen] = useState(false);
  const { data = [] } = useGetPlaylists();
  const createPlaylist = useCreatePlaylist();

  const playlists = useMemo(() => {
    return data.sort(sortByDateDesc('updated_at'));
  }, [data]);

  const handleCreatePlaylist = async event => {
    event.preventDefault();
    const name = event.currentTarget.name.value.trim();
    await createPlaylist.mutateAsync({ name });
    setOpen(false);
  };

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Main>
      <Modal open={open} onClose={handleClose}>
        <form onSubmit={handleCreatePlaylist}>
          <h3>New playlist</h3>
          <Input
            autoFocus
            name="name"
            placeholder="Trying to come up with something funny..."
            label="Playlist name"
            maxLength={200}
            text={`Maybe something like "Squid Game 2021"`}
          />
          <div className="t-right">
            <Button
              type="submit"
              variant="primary"
              className="mr-2"
              loading={createPlaylist.isLoading}
            >
              Create
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </div>
        </form>
      </Modal>

      {playlists.length ? (
        <>
          <Button variant="primary" className="mb-3" onClick={handleClick}>
            New playlist
          </Button>
          <ul className={styles.playlists}>
            {playlists.map((playlist, index) => (
              <Link
                key={playlist.id}
                className={styles.playlist}
                to={`/playlists/${playlist.id}`}
              >
                <span className={styles.playlistNumber}>{index + 1}</span>
                <span className={styles.playlistName}>{playlist.name}</span>
                <span className={styles.playlistDate}>
                  {elapsed(new Date(playlist.updated_at))}
                </span>
              </Link>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p>This looks awfully empty 😅.</p>
          <Button onClick={handleClick}>Let's create a new playlist.</Button>
        </>
      )}
    </Main>
  );
}

export default Playlists;
