import axios from "axios";

import useAuthStore from "../hooks/auth.store";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: any) => {
    const user = useAuthStore.getState().auth.user;

    config.withCredentials = true;

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    // if (error?.response?.status == 401) useAuthStore.getState().logout();
    return Promise.reject(error);
  }
);

export const apiRoutes = {
  users: {
    create: "users",
  },
};
