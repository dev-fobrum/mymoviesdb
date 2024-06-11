import { create } from "zustand";
import { persist } from "zustand/middleware";

import { api } from "../services/api";

interface IAuth {
  user: {
    id: number;
    name: string;
  } | null;
  isAuthenticated?: boolean;
}

interface IAuthStore {
  auth: IAuth;
  menus: Array<string>;
  login?: (login: IAuth, menus: Array<string>) => void;
  logout?: () => void;
}

const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      auth: {
        isAuthenticated: false,
        user: null,
      },
      menus: [],
      login: (login, menus) =>
        set({
          auth: {
            ...login,
            isAuthenticated: true,
          },
          menus,
        }),
      logout: async () => {
        await api.post("/auth/logout");
        return set({
          auth: {
            user: null,
            isAuthenticated: false,
          },
          menus: [],
        });
      },
    }),
    {
      name: "login-control",
    }
  )
);

export default useAuthStore;
