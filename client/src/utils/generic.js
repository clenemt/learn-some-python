import { addSeconds, format } from 'date-fns';

export const noop = () => {};

// Returns human readable duration
export const duration = seconds => {
  const date = addSeconds(new Date(0), seconds);
  return format(date, 'mm:ss');
};
