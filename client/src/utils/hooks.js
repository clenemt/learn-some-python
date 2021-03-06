import { useEffect, useState } from 'react';

// Hook to render with delay
export const useDelayedRender = delay => {
  const [delayed, setDelayed] = useState(true);
  useEffect(() => {
    const timeout = window.setTimeout(() => setDelayed(false), delay);
    return () => clearTimeout(timeout);
  }, [delay]);
  return fn => !delayed && fn();
};
