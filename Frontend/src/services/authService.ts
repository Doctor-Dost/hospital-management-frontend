import api from '../utils/api';
import type { User } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  user: User;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordData) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  refreshToken: async () => {
    const response = await api.post('/auth/refresh-token');
    return response.data;
  },
};