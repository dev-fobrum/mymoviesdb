import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { apiRoutes } from "../../../services/api";

import MoviesGrid from "../../../components/MoviesGrid/MoviesGrid";

import { setSearchQuerySearch } from "../../../store/filtersSlice";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const q = params.get("q");

  const [query, setQuery] = useState<string | null>(q);

  useEffect(() => {
    setSearchQuerySearch(q);
    setQuery(q);
  }, [q]);

  return (
    <Container className="search-form">
      <div>
        <h1 className="theme-primary-color">Resultados para: {q}</h1>

        <MoviesGrid
          filter="searchFilters"
          route={apiRoutes.movies.search(q ? q : "")}
        />
      </div>
    </Container>
  );
};

export default Search;
