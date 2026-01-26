import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

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

// Grabs access token
apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error fetching token from storage", error);
  }
  return config;
});

// Catches 401 Errors
apiClient.interceptors.response.use(
  (response) => response, // Return success responses as is
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("🚨 401 Detected! Logging out...");
      
      await SecureStore.deleteItemAsync('access_token');
      
      router.replace('/login');
    }
    return Promise.reject(error);
  }
);