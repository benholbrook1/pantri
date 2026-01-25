import axios from 'axios';

// Grabs base url from .env
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
if (!BASE_URL) {
  console.warn("Warning: EXPO_PUBLIC_API_URL is not defined in your .env file!");
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});