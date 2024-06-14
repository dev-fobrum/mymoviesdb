import Dashboard from "../pages/private/Dashboard/Dashboard";
import Favorites from "../pages/private/Favorites/Favorites";
import MovieDetails from "../pages/private/MovieDetails/MovieDetails";
import MyReviews from "../pages/private/MyReviews/MyReviews";
import Profile from "../pages/private/Profile/Profile";

export const authenticatedRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    name: "Perfil",
    element: <Profile />,
  },
  {
    path: "/reviews",
    name: "Minhas Avaliações",
    element: <MyReviews />,
  },
  {
    path: "/favorites",
    name: "Favoritos",
    element: <Favorites />,
  },
  {
    path: "/moviedetails/:movieId",
    name: "Detalhes do Filme",
    element: <MovieDetails />,
  },
];
