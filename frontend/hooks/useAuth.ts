import * as SecureStore from 'expo-secure-store';
import { apiClient } from '../api/client';
import { LoginRequest, AuthResponse } from '../types/api';

export const useAuth = () => {
  const login = async (credentials: LoginRequest) => {
    try {

      const response = await apiClient.post<AuthResponse>('/auth/login/', credentials);
      
      await SecureStore.setItemAsync('access_token', response.data.access);
      await SecureStore.setItemAsync('refresh_token', response.data.refresh);
      
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      
      return response.data.user;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    delete apiClient.defaults.headers.common['Authorization'];
  };

  return { login, logout };
};