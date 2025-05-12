import api from '../utils/api';
import { AxiosError } from 'axios';

interface DailyData {
    title: string;
    description: string;
    date: string;
};

export const createDaily = async (data: DailyData) => {
    try {
        const response = await api.post('/dailies/create', data);
        return response.data;
    } catch (error: unknown) {
        const err = error as AxiosError<{ error: string }>;
        const errorMessage = err.response?.data?.error || 'Error creating daily';
        throw new Error(errorMessage);
    }
};

export const getAllDailies = async () => {
    try {
        const response = await api.get('/dailies');
        return response.data;
    } catch (error: unknown) {
        const err = error as AxiosError<{ error: string }>;
        const errorMessage = err.response?.data?.error || 'Error fetching dailies';
        throw new Error(errorMessage);
    }
};

export const getDailyById = async (id: string) => {
    try {
        const response = await api.get(`/dailies/${id}`);
        return response.data;
    } catch (error: unknown) {
        const err = error as AxiosError<{ error: string }>;
        const errorMessage = err.response?.data?.error || 'Error fetching daily';
        throw new Error(errorMessage);
    }
};

export const updateDaily = async (id: string, data: DailyData) => {
    try {
        const response = await api.put(`/dailies/update/${id}`, data);
        return response.data;
    } catch (error: unknown) {
        const err = error as AxiosError<{ error: string }>;
        const errorMessage = err.response?.data?.error || 'Error updating daily';
        throw new Error(errorMessage);
    }
};

export const deleteDaily = async (id: string) => {
    try {
        const response = await api.delete(`/dailies/delete/${id}`);
        return response.data;
    } catch (error: unknown) {
        const err = error as AxiosError<{ error: string }>;
        const errorMessage = err.response?.data?.error || 'Erro ao excluir daily';
        throw new Error(errorMessage);
    }
};
