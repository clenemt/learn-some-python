import create from 'zustand';
import { persist } from 'zustand/middleware';

// A trivial store for storing the current track
export const useTrack = create(
  persist(
    set => ({
      track: 0,
      setTrack: track => set(() => ({ track }))
    }),
    {
      name: 'track',
      getStorage: () => sessionStorage
    }
  )
);
