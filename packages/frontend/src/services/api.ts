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
    console.error("error", error);
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
    console.error("error", error);
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
    movieDetails: (movieId: number | string) => `movies/${movieId}`,
    similar: (movieId: number | string) => `movies/similar/${movieId}`,
    discover: "movies/discover",
    trending: "movies/trending",
    genres: "movies/genres",
  },
  favorites: {
    findAll: "favorites",
    findOne: (movieId: number | string) => `favorites/${movieId}`,
    create: "favorites",
    remove: (movieId: number | string) => `favorites/${movieId}`,
  },
  lastSee: {
    findAll: "lastsee",
    create: "lastsee",
  },
  review: {
    findAll: "reviews",
    create: "reviews",
    update: (reviewId: number | string) => `reviews/${reviewId}`,
    delete: (reviewId: number | string) => `reviews/${reviewId}`,
    findOne: (reviewId: number | string) => `reviews/${reviewId}`,
    findByUser: (movieId: number | string) => `reviews/movie/${movieId}`,
  },
};
