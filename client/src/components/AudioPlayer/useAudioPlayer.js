import { useEffect, useRef, useState } from 'react';

export const useAudioPlayer = (audioRef, track, isPlaying, callback) => {
  const callbackRef = useRef(callback);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audioRef.current) return;

    const handlePlay = () => callbackRef.current(true);
    const handlePause = () => callbackRef.current(false);
    const handleTimeUpdate = event => {
      const progress = event.target.currentTime / event.target.duration;
      setProgress(progress || 0);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
  }, [audioRef]);

  useEffect(() => {
    audioRef.current.currentTime = 0;
  }, [audioRef, track]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [audioRef, isPlaying, track]);

  return progress;
};
