import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { authenticatedRoutes } from "./authenticated.routes";
import { guestRoutes } from "./public.routes";

import GuestLayout from "../layouts/GuestLayout";
import MainLayout from "../layouts/MainLayout";

const Router = () => {
  const auth = useSelector((state: any) => state.auth.auth);

  const isAuthenticated = auth.isAuthenticated;

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <MainLayout /> : <GuestLayout />}
      >
        {guestRoutes.map((route, idx) => (
          <Route
            key={`route-${idx}`}
            path={`/${route.path}`}
            element={route.element}
          />
        ))}
        {isAuthenticated &&
          authenticatedRoutes.map((route, idx) => (
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
