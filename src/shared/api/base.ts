import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const baseRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
