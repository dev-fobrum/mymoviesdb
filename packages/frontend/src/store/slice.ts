import { createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

const initialState = {
  auth: {
    user: null,
    token: null,
    isAuthenticated: false,
  },
};

const authSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    login(state, action) {
      state.auth = {
        ...action.payload,
        isAuthenticated: true,
      };
    },
    logout(state) {
      state.auth = {
        user: null,
        token: null,
        isAuthenticated: false,
      };
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
