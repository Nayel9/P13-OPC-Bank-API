import { configureStore, createSlice } from "@reduxjs/toolkit";
import apiService from "./services/apiService";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
    token: localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || null,
    isAuthenticated: !!(localStorage.getItem('authToken') || sessionStorage.getItem('authToken')),
    error: null,
    firstName: "",
    lastName: "",
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
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.firstName = "";
      state.lastName = "";
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
    },
  },
});

export const { setEmail, setPassword, setToken, setProfile, setError, logout } =
  userSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await apiService.login(email, password);
    console.log("Login response:", response);
    dispatch(setToken({ token: response.body.token }));
    const profileResponse = await apiService.getProfile(
      response.body.firstName,
      response.body.lastName,
    );

    dispatch(
      setProfile({
        firstName: profileResponse.body.firstName,
        lastName: profileResponse.body.lastName,
      }),
    );
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