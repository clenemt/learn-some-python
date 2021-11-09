import { useQuery } from 'react-query';
import { axios } from './utils';

const TRACKS_KEY = 'tracks';

const getTracks = async () => {
  const { data } = await axios.get(`tracks`);
  return data;
};

export const useGetTracks = () => useQuery(TRACKS_KEY, getTracks);
