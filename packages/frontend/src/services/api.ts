import axios from "axios";
import { store } from "../store";
import { login, logout } from "../store/authSlice";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: any) => {
    const user = store.getState();

    config.headers.Authorization = `${user.auth.credentials.token}`;

    return config;
  },
  (error: any) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: any) => {
    if (response?.data?.token) {
      const user = { ...response.data };
      store.dispatch(login(user));
    }

    return response;
  },
  (error: any) => {
    console.log("error", error);
    if (error?.response?.status == 401) store.dispatch(logout());
    return Promise.reject(error);
  }
);

export const apiRoutes = {
  users: {
    findProfile: "findProfile",
    create: "users",
    update: "users",
  },
  auth: {
    login: "/login",
    forgotPassword: "/forgot-password",
  },
  dashboard: {
    get: "dashboard",
  },
  movies: {
    getAvaliation: "movies",
    avaliate: "movies/avaliate",
  },
};
