import useAuthStore from "../hooks/auth.store";

import Dashboard from "../pages/private/Dashboard";

export const authenticatedRoutes = [
  {
    path: "dashboard",
    name: "Dashboard",
    icon: <></>,
    element: <Dashboard />,
    menu: true,
  },
];

export const menus = authenticatedRoutes.filter(
  (route) =>
    route?.menu &&
    useAuthStore.getState().menus.find((r: any) => r == route?.path)
);
