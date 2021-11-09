import npmAxios from 'axios';
import { QueryClient } from 'react-query';
import { REST_URL } from '../utils/constants';

export const axios = npmAxios.create({
  baseURL: REST_URL
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
});
