import axios from 'axios';
import store from '../store';
import data from '../data/usersAccount.json';

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

  updateProfile: async (firstName, lastName) => {
    try {
      const response = await apiClient.put('/user/profile', { firstName, lastName });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getAccounts: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = data.users.find(user => user.id === userId);
        resolve(user ? user.accounts : []);
      }, 250); // Simule un délai de réponse
    });
  },
};

export default apiService;