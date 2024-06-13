import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Row, Col } from "react-bootstrap";

import CustomCheckbox from "./CustomCheckbox";

import { setGenres } from "../../store/filtersSlice";

const GenreFilter = () => {
  const dispatch = useDispatch();
  const featuredFilters = useSelector(
    (state: any) => state.filters.featuredFilters
  );

  const handleGenreToggle = (genre: string) => {
    const updatedGenres = featuredFilters.genres.includes(genre)
      ? featuredFilters.genres.filter((item: string) => item !== genre)
      : [...featuredFilters.genres, genre];

    dispatch(setGenres(updatedGenres));

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
