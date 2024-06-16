import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Form,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";

import CustomCheckbox from "./CustomCheckbox";

import {
  setGenres,
  setFavoritesGenres,
  setSearchGenres,
  setOrdering,
  setFavoritesOrdering,
  setSearchOrdering,
  clearFilters,
  clearFavoritesFilters,
  clearSearchFilters,
} from "../../store/filtersSlice";
import { api, apiRoutes } from "../../services/api";

import Genre from "../../interfaces/Genre";
import { FaFilter, FaTrash } from "react-icons/fa";

interface GenreFilterProps {
  type: string;
}

const GenreFilter: FC<GenreFilterProps> = ({ type }) => {
  const dispatch = useDispatch();

  const featuredFilters = useSelector((state: any) => state.filters[type]);

  const switchDispatcher = (value: any, action = "") => {
    switch (action) {
      case "genre":
        switch (type) {
          case "featuredFilters":
            dispatch(setGenres(value));
            break;
          case "favoritesFilters":
            dispatch(setFavoritesGenres(value));
            break;
          case "searchFilters":
            dispatch(setSearchGenres(value));
        }
        break;
      case "ordering":
        switch (type) {
          case "featuredFilters":
            dispatch(setOrdering(value));
            break;
          case "favoritesFilters":
            dispatch(setFavoritesOrdering(value));
            break;
          case "searchFilters":
            dispatch(setSearchOrdering(value));
        }
        break;
      case "clear":
        switch (type) {
          case "featuredFilters":
            dispatch(clearFilters());
            break;
          case "favoritesFilters":
            dispatch(clearFavoritesFilters());
            break;
          case "searchFilters":
            dispatch(clearSearchFilters());
        }
        break;
    }
  };

  const [availableGenres, setAvailableGenres] = useState<Genre[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(apiRoutes.movies.genres);

      setAvailableGenres(response.data.genres);
    }

    fetchData();
  }, []);

  const handleGenreToggle = (genre: number) => {
    const updatedGenres = featuredFilters.genres.includes(genre)
      ? featuredFilters.genres.filter((item: number) => item !== genre)
      : [...featuredFilters.genres, genre];

    switchDispatcher(updatedGenres, "genre");

    return true;
  };

  const handleOrdenationChange = (e: string | null) => {
    if (!e) return;

    switchDispatcher(e, "ordering");
  };

  const handleClearFilters = () => {
    switchDispatcher("", "clear");
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col className="display-6 mb-2 theme-primary-color d-flex justify-content-center">
          Combine os gêneros e descubra filmes
        </Col>
      </Row>
      <Form>
        <Row>
          {availableGenres.map((genre) => (
            <Col className="mb-2" key={genre.id}>
              <CustomCheckbox
                id={`genre-${genre.id}`}
                label={genre.name}
                checked={
                  Array.isArray(featuredFilters?.genres)
                    ? featuredFilters?.genres.includes(genre.id)
                    : []
                }
                onChange={() => handleGenreToggle(genre.id)}
              />
            </Col>
          ))}
        </Row>
      </Form>

      <Row className="d-flex mt-4">
        <Col className="d-flex align-items-center justify-content-center">
          <DropdownButton
            id="filter-btn"
            className="filter-btn"
            title={
              <div className="d-flex gap-1">
                <span>{featuredFilters.ordering}</span>
                <span style={{ position: "relative", bottom: 1 }}>
                  <FaFilter />
                </span>
              </div>
            }
            onSelect={(eventKey) => handleOrdenationChange(eventKey)}
          >
            <Dropdown.Item eventKey="Popularidade">Popularidade</Dropdown.Item>
            <Dropdown.Item eventKey="Data de Lançamento">
              Data de Lançamento
            </Dropdown.Item>
            <Dropdown.Item eventKey="Título (A-Z)">Título (A-Z)</Dropdown.Item>
            <Dropdown.Item eventKey="Título (Z-A)">Título (Z-A)</Dropdown.Item>
          </DropdownButton>
        </Col>

        <Col className="d-flex align-items-center justify-content-center">
          <Button
            variant="secondary"
            className="theme-btn"
            onClick={handleClearFilters}
          >
            <div className="d-flex gap-1 ">
              <span>Limpar</span>
              <span style={{ position: "relative", bottom: 2 }}>
                <FaTrash />
              </span>
            </div>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default GenreFilter;
