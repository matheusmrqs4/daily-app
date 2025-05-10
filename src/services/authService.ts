import api from '../utils/api';
import { AxiosError } from 'axios';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await api.post('/users/register', data);
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ error: string }>;
    const errorMessage = err.response?.data?.error || 'Error during registration';
    throw new Error(errorMessage);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ error: string }>;
    const errorMessage = err.response?.data?.error || 'Error during login';
    throw new Error(errorMessage);
  }
};

export const logoutUser = async () => {
  try {
    await api.post('/users/logout'); //criar na api
  } catch (error: unknown) {
    const err = error as AxiosError<{ error: string }>;
    const errorMessage = err.response?.data?.error || 'Error during logout';
    throw new Error(errorMessage);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ error: string }>;
    const errorMessage = err.response?.data?.error || 'Error fetching user profile';
    throw new Error(errorMessage);
  }
};
