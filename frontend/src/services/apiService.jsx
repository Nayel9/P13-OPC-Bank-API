import axios from 'axios';
import store from '../store';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token à chaque requête
apiClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.user.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const apiService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/user/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getProfile: async () => {
    try {
      const response = await apiClient.post('/user/profile', {});
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/user/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default apiService;