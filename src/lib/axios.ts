import type { AxiosResponse } from 'axios';
import axios from 'axios';

export const BASE_URL = process.env.API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.API_KEY ?? ''}`,
  },
});

api.interceptors.response.use((config: AxiosResponse) => {
  if (+config.status === 401) {
    console.log(
      'Invalid request token: The request token is either expired or invalid.',
    );
  }

  return config;
});

export { api };
