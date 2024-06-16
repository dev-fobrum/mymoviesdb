import ActorDetails from "../pages/private/ActorDetails/ActorDetails";
import Dashboard from "../pages/private/Dashboard/Dashboard";
import Favorites from "../pages/private/Favorites/Favorites";
import MovieDetails from "../pages/private/MovieDetails/MovieDetails";
import MyReviews from "../pages/private/MyReviews/MyReviews";
import Profile from "../pages/private/Profile/Profile";
import Search from "../pages/private/Search/Search";

export const authenticatedRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/search",
    name: "Pesquisar",
    element: <Search />,
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
  {
    path: "/actordetails/:actorId",
    name: "Detalhes do Ator",
    element: <ActorDetails />,
  },
];
