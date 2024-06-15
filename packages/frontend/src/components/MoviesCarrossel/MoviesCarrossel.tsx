import { FC, useEffect, useState } from "react";
import { Carousel, Col, Container, Row, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { FaStar, FaCalendar } from "react-icons/fa";

import IMovieList from "../../interfaces/MovieList.interface";

import { formatDateToBR } from "../../utils/Dates";

import "./styles.css";
import { api } from "../../services/api";

interface MoviesCarrosselInterface {
  title: string;
  route?: string;
  data?: IMovieList[];
}

const baseImgUrl = "https://image.tmdb.org/t/p/w780/";

const MoviesCarrossel: FC<MoviesCarrosselInterface> = ({
  title,
  route,
  data,
}) => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<IMovieList[]>(data ? data : []);

  useEffect(() => {
    async function fetchData() {
      if (!route) return;

      const response = await api.get(route, {
        params: {
          page: 1,
        },
      });

      setMovies(response.data.results);
    }

    fetchData();
  }, []);

  const navigateToMovie = (movieId: number) => {
    navigate(`/moviedetails/${movieId}`);
  };

  return (
    <Container id={title}>
      <Row>
        <Col>
          <div className="display-5 mt-4 mb-3 section-title d-flex justify-content-center">
            {title}
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Carousel
            interval={null}
            indicators={false}
            prevIcon={<span className="prev-icon">&#10094;</span>}
            nextIcon={<span className="next-icon">&#10095;</span>}
          >
            {[...Array(Math.ceil(movies.length / 4))].map((_, index) => (
              <Carousel.Item key={index} className="cursor-pointer">
                <Row>
                  {movies
                    .slice(index * 4, index * 4 + 4)
                    .map((movie, movieIndex) => (
                      <Col
                        key={movie.id}
                        md={3}
                        onClick={() => navigateToMovie(movie.id)}
                      >
                        <div>
                          <img
                            className="d-block w-100"
                            src={`${baseImgUrl}${movie.poster_path}`}
                            alt={`Slide ${index * 4 + movieIndex}`}
                          />
                          <Col className="movie-details">
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip
                                  style={{
                                    position:
                                      "absolute" /** Havia um erro de barra vertical e foi necessário essa correção */,
                                  }}
                                >
                                  {movie.title}
                                </Tooltip>
                              }
                            >
                              <div className="movie-title">{movie.title}</div>
                            </OverlayTrigger>
                            <div>
                              <FaCalendar />{" "}
                              {formatDateToBR(movie.release_date)}
                            </div>
                            <div>
                              <FaStar /> {movie.vote_average}
                            </div>
                          </Col>
                        </div>
                      </Col>
                    ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviesCarrossel;
