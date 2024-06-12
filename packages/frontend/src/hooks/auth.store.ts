import { createSlice } from "@reduxjs/toolkit";
import { api } from "../services/api";

const initialState = {
  auth: {
    user: null,
    isAuthenticated: false,
  },
  menus: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.auth = {
        ...action.payload,
        isAuthenticated: true,
      };
      state.menus = action.payload.menus;
    },
    logout(state) {
      // await api.post("/auth/logout");
      state.auth = {
        user: null,
        isAuthenticated: false,
      };
      state.menus = [];
    },
  },
});

// Exporta as ações geradas pelo slice
export const { login, logout } = authSlice.actions;

// Exporta o redutor do slice
export default authSlice.reducer;
