import create from 'zustand';

// A trivial store for storing the current track
export const useTrack = create(set => ({
  track: 0,
  setTrack: track => set(() => ({ track }))
}));
