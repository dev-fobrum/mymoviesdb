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
  setOrdering,
  setFavoritesOrdering,
  clearFilters,
  clearFavoritesFilters,
} from "../../store/filtersSlice";
import { api, apiRoutes } from "../../services/api";

import Genre from "../../interfaces/Genre";
import { FaFilter, FaTrash } from "react-icons/fa";

interface GenreFilterProps {
  type: string;
}

const GenreFilter: FC<GenreFilterProps> = ({ type }) => {
  const dispatch = useDispatch();

  const featuredFilters = useSelector((state: any) =>
    type === "featured"
      ? state.filters.featuredFilters
      : state.filters.favoritesFilters
  );

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

    type === "featured"
      ? dispatch(setGenres(updatedGenres))
      : dispatch(setFavoritesGenres(updatedGenres));

    return true;
  };

  const handleOrdenationChange = (e: string | null) => {
    if (!e) return;

    type === "featured"
      ? dispatch(setOrdering(e))
      : dispatch(setFavoritesOrdering(e));
  };

  const handleClearFilters = () => {
    type === "featured"
      ? dispatch(clearFilters())
      : dispatch(clearFavoritesFilters());
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
