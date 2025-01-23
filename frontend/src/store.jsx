import { configureStore, createSlice } from "@reduxjs/toolkit";
import apiService from "./services/apiService";

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
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
    },
    setProfile: (state, action) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
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
    setSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
    resetSelectedAccount: (state) => {
      state.selectedAccount = null;
    },
    setExpandedTransaction: (state, action) => {
      state.expandedTransaction =
          state.expandedTransaction === action.payload ? null : action.payload;
    },
  },
});

export const { setEmail, setPassword, setToken, setProfile, setError,logout, setSelectedAccount, resetSelectedAccount, setExpandedTransaction } = userSlice.actions;

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

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;