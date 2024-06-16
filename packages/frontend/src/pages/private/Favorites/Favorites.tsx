import React from "react";
import { Container } from "react-bootstrap";

import SearchTools from "../../../components/SearchTools/SearchTools";
import MoviesGrid from "../../../components/MoviesGrid/MoviesGrid";

import { apiRoutes } from "../../../services/api";

const Favorites: React.FC = () => {
  return (
    <Container>
      <SearchTools type="favorites" />

      <MoviesGrid
        title="Meus Favoritos"
        filter="favoritesFilters"
        route={apiRoutes.favorites.findAll}
      />
    </Container>
  );
};

export default Favorites;
