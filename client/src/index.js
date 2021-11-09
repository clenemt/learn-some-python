import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './apis/utils';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tracks from './pages/tracks/Tracks/Tracks';
import Playlists from './pages/playlists/Playlists/Playlists';
import Playlist from './pages/playlist/Playlist/Playlist';

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tracks />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlist/:playlistId" element={<Playlist />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
