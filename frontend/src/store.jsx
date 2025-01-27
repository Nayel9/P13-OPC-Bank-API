import { configureStore, createSlice } from "@reduxjs/toolkit";
    import apiService from "./services/apiService";

    /**
     * Slice utilisateur pour gérer l'état de l'utilisateur.
     */
    const userSlice = createSlice({
      name: "user",
      initialState: {
        id: null,
        email: "",
        password: "",
        token: sessionStorage.getItem('authToken') || null,
        isAuthenticated: !!sessionStorage.getItem('authToken'),
        error: null,
        firstName: "",
        lastName: "",
        selectedAccount: null,
        expandedTransaction: null,
      },
      reducers: {
        /**
         * Met à jour l'email de l'utilisateur.
         * @param {Object} state - L'état actuel.
         * @param {Object} action - L'action contenant la nouvelle valeur de l'email.
         */
        setEmail: (state, action) => {
          state.email = action.payload;
        },
        /**
         * Met à jour le mot de passe de l'utilisateur.
         * @param {Object} state - L'état actuel.
         * @param {Object} action - L'action contenant la nouvelle valeur du mot de passe.
         */
        setPassword: (state, action) => {
          state.password = action.payload;
        },
        /**
         * Met à jour le token d'authentification de l'utilisateur.
         * @param {Object} state - L'état actuel.
         * @param {Object} action - L'action contenant le nouveau token.
         */
        setToken: (state, action) => {
          state.token = action.payload.token;
          state.isAuthenticated = !!action.payload.token;
        },
        /**
         * Met à jour le profil de l'utilisateur.
         * @param {Object} state - L'état actuel.
         * @param {Object} action - L'action contenant les nouvelles informations du profil.
         */
        setProfile: (state, action) => {
          state.id = action.payload.id;
          state.firstName = action.payload.firstName;
          state.lastName = action.payload.lastName;
        },
        /**
         * Met à jour l'erreur de l'utilisateur.
         * @param {Object} state - L'état actuel.
         * @param {Object} action - L'action contenant le message d'erreur.
         */
        setError: (state, action) => {
          state.error = action.payload;
        },
        /**
         * Déconnecte l'utilisateur et réinitialise l'état.
         * @param {Object} state - L'état actuel.
         */
        logout: (state) => {
          state.id = null;
          state.email = "";
          state.password = "";
          state.token = null;
          state.isAuthenticated = false;
          state.error = null;
          state.firstName = "";
          state.lastName = "";
          state.selectedAccount = null;
          sessionStorage.removeItem('authToken');
        },
        /**
         * Met à jour le compte sélectionné de l'utilisateur.
         * @param {Object} state - L'état actuel.
         * @param {Object} action - L'action contenant le compte sélectionné.
         */
        setSelectedAccount: (state, action) => {
          state.selectedAccount = action.payload;
        },
        /**
         * Réinitialise le compte sélectionné de l'utilisateur.
         * @param {Object} state - L'état actuel.
         */
        resetSelectedAccount: (state) => {
          state.selectedAccount = null;
        },
        /**
         * Met à jour la transaction étendue de l'utilisateur.
         * @param {Object} state - L'état actuel.
         * @param {Object} action - L'action contenant la transaction étendue.
         */
        setExpandedTransaction: (state, action) => {
          state.expandedTransaction =
              state.expandedTransaction === action.payload ? null : action.payload;
        },
      },
    });

    export const { setEmail, setPassword, setToken, setProfile, setError, logout, setSelectedAccount, resetSelectedAccount, setExpandedTransaction } = userSlice.actions;

    /**
     * Action asynchrone pour connecter l'utilisateur.
     * @param {string} email - L'email de l'utilisateur.
     * @param {string} password - Le mot de passe de l'utilisateur.
     * @returns {Function} - Une fonction dispatch.
     */
    export const login = (email, password) => async (dispatch) => {
      try {
        const response = await apiService.login(email, password);
        console.log("Login response:", response);
        dispatch(setToken({ token: response.body.token }));
        const profileResponse = await apiService.getProfile();
        console.log("Profile response:", profileResponse);
        dispatch(setProfile({
          id: profileResponse.body.id,
          firstName: profileResponse.body.firstName,
          lastName: profileResponse.body.lastName,
        }));
        dispatch(setError(null));
      } catch (error) {
        console.log("Login error:", error);
        dispatch(setError(error.message));
      }
    };

    /**
     * Configuration du store Redux.
     */
    const store = configureStore({
      reducer: {
        user: userSlice.reducer,
      },
    });

    export default store;