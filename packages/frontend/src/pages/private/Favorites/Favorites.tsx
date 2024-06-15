import React from "react";

import SearchTools from "../../../components/SearchTools/SearchTools";
import MoviesGrid from "../../../components/MoviesGrid/MoviesGrid";
import { Container } from "react-bootstrap";

const Favorites: React.FC = () => {
  return (
    <Container>
      <SearchTools type="favorites" />

      <MoviesGrid title="Meus Favoritos" />
    </Container>
  );
};

export default Favorites;
