import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor per aggiungere il token alle richieste
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

export const taskAPI = {
  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },
  createTask: async (title) => {
    const response = await api.post('/tasks', { title });
    return response.data;
  },
  updateTask: async (id, updates) => {
    const response = await api.patch(`/tasks/${id}`, updates);
    return response.data;
  },
  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
  },
}; 