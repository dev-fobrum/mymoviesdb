import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Row, Col } from "react-bootstrap";

import CustomCheckbox from "./CustomCheckbox";

import { setGenres, setFavoritesGenres } from "../../store/filtersSlice";

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

  const handleGenreToggle = (genre: string) => {
    const updatedGenres = featuredFilters.genres.includes(genre)
      ? featuredFilters.genres.filter((item: string) => item !== genre)
      : [...featuredFilters.genres, genre];

    type === "featured"
      ? dispatch(setGenres(updatedGenres))
      : dispatch(setFavoritesGenres(updatedGenres));

    return true;
  };

  const availableGenres = [
    "Ação",
    "Comédia",
    "Drama",
    "Fantasia",
    "Ficção Científica",
    "Suspense",
  ];

  return (
    <Container className="mt-4">
      <Form>
        <Row>
          {availableGenres.map((genre) => (
            <Col className="mb-2" key={genre}>
              <CustomCheckbox
                id={`genre-${genre}`}
                label={genre}
                checked={
                  Array.isArray(featuredFilters?.genres)
                    ? featuredFilters?.genres.includes(genre)
                    : []
                }
                onChange={() => handleGenreToggle(genre)}
              />
            </Col>
          ))}
        </Row>
      </Form>
    </Container>
  );
};

export default GenreFilter;
