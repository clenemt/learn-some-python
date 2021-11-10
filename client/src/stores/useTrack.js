import create from 'zustand';
import { persist } from 'zustand/middleware';

// A trivial store for storing the current track
export const useTrack = create(
  persist(
    set => ({
      track: null,
      isPlaying: false,
      setTrack: track => set(() => ({ track, isPlaying: true })),
      setIsPlaying: isPlaying => set(() => ({ isPlaying }))
    }),
    {
      name: 'track',
      getStorage: () => sessionStorage,
      partialize: ({ track }) => ({ track })
    }
  )
);
