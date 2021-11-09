import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './apis/utils';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import { Delayed } from './components/Delayed/Delayed';

const Tracks = React.lazy(() => import('./pages/tracks/Tracks/Tracks'));
const Playlist = React.lazy(() => import('./pages/playlist/Playlist/Playlist'));
const Playlists = React.lazy(() =>
  import('./pages/playlists/Playlists/Playlists')
);

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Delayed>Loading...</Delayed>}>
          <Routes>
            <Route path="/" element={<Tracks />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/playlist/:playlistId" element={<Playlist />} />
          </Routes>
          <AudioPlayer />
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
