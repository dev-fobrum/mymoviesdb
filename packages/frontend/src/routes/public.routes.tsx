import Login from "../pages/public/Login";
import ForgotPassword from "../pages/public/ForgotPassword";

export const guestRoutes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
];
