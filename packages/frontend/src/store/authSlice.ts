import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  credentials: {
    name: null,
    lastName: null,
    user: null,
    token: null,
    isAuthenticated: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.credentials = {
        ...action.payload,
        token: action.payload.token,
        isAuthenticated: true,
      };
    },
    logout(state) {
      state.credentials = {
        name: null,
        lastName: null,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
