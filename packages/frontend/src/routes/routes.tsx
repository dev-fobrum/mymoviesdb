import { Routes, Route, Navigate } from "react-router-dom";

import { authenticatedRoutes } from "./authenticated.routes";
import { guestRoutes } from "./public.routes";

import GuestLayout from "../layouts/GuestLayout";
import MainLayout from "../layouts/MainLayout";

import useAuthStore from "../hooks/auth.store";

const Router = () => {
  const { auth } = useAuthStore();
  const isAuthenticated = auth.isAuthenticated;
  const routes = isAuthenticated ? authenticatedRoutes : guestRoutes;

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <MainLayout /> : <GuestLayout />}
      >
        {routes.map((route, idx) => (
          <Route
            key={`route-${idx}`}
            path={`/${route.path}`}
            element={route.element}
          />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
