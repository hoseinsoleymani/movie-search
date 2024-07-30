import axios from 'axios';

export const BASE_URL = process.env.API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`
  },
});

// api.interceptors.request.use((config: any) => {
//   const token = localStorage.getItem(AUTH_USER_KEY);

//   if (token && config.headers) {
//     return {
//       ...config,
//       headers: {
//         ...config.headers,
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   }

//   return config;
// });

export { api };