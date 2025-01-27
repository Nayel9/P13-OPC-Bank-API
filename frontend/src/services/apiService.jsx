import axios from 'axios';
import store from '../store';
import data from '../data/usersAccount.json';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Intercepteur de requêtes pour ajouter le token d'authentification aux en-têtes.
 */
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
  /**
   * Effectue une requête de connexion.
   * @param {string} email - L'email de l'utilisateur.
   * @param {string} password - Le mot de passe de l'utilisateur.
   * @returns {Promise<Object>} Les données de réponse de l'API.
   * @throws {Object} Les données d'erreur de l'API.
   */
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/user/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  /**
   * Récupère le profil de l'utilisateur.
   * @returns {Promise<Object>} Les données de réponse de l'API.
   * @throws {Object} Les données d'erreur de l'API.
   */
  getProfile: async () => {
    try {
      const response = await apiClient.post('/user/profile', {});
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  /**
   * Met à jour le profil de l'utilisateur.
   * @param {string} firstName - Le prénom de l'utilisateur.
   * @param {string} lastName - Le nom de famille de l'utilisateur.
   * @returns {Promise<Object>} Les données de réponse de l'API.
   * @throws {Object} Les données d'erreur de l'API.
   */
  updateProfile: async (firstName, lastName) => {
    try {
      const response = await apiClient.put('/user/profile', { firstName, lastName });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  /**
   * Récupère les comptes de l'utilisateur.
   * @param {string} userId - L'identifiant de l'utilisateur.
   * @param {Function} setLoading - Fonction pour définir l'état de chargement.
   * @returns {Promise<Array>} Les comptes de l'utilisateur.
   */
  getAccounts: async (userId, setLoading) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = data.users.find(user => user.id === userId);
        resolve(user ? user.accounts : []);
        setLoading(false);
      }, 350);
    });
  },

  /**
   * Récupère les transactions d'un compte utilisateur.
   * @param {string} userId - L'identifiant de l'utilisateur.
   * @param {string} accountId - L'identifiant du compte.
   * @param {Function} setLoading - Fonction pour définir l'état de chargement.
   * @returns {Promise<Array>} Les transactions du compte.
   */
  getTransactions: async (userId, accountId, setLoading) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = data.users.find(user => user.id === userId);
        if (user) {
          const account = user.accounts.find(account => account.id === accountId);
          resolve(account ? account.transactions : []);
        } else {
          resolve([]);
        }
        setLoading(false);
      }, 350);
    });
  },
};

export default apiService;