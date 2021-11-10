import { addSeconds, format, formatDistanceToNow } from 'date-fns';

export const noop = () => {};

// Returns human readable duration
export const duration = seconds => {
  const date = addSeconds(new Date(0), seconds);
  return format(date, 'mm:ss');
};

export const elapsed = date => {
  return formatDistanceToNow(date, { includeSeconds: true, addSuffix: true });
};

export const sortByDateAsc = key => (a, b) =>
  new Date(key ? a[key] : a).getTime() - new Date(key ? b[key] : b).getTime();

export const sortByDateDesc = key => (a, b) =>
  new Date(key ? b[key] : b).getTime() - new Date(key ? a[key] : a).getTime();

export const sortByAlphaAsc = key => (a, b) =>
  (key ? a[key] : a).localeCompare(key ? b[key] : b);

export const sortByAlphaDesc = key => (a, b) =>
  (key ? a[key] : a).localeCompare(key ? b[key] : b) * -1;
