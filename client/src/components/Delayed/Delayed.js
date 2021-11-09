import { useDelayedRender } from '../../utils/hooks';

export const Delayed = ({ delay = 300, children }) =>
  useDelayedRender(delay)(() => children);
