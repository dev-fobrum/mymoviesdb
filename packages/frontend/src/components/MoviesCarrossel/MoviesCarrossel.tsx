import React, { FC, useEffect, useState } from "react";
import { Carousel, Col, Container, Row, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { FaStar, FaCalendar } from "react-icons/fa";

import IMovieList from "../../interfaces/MovieList.interface";
import { api } from "../../services/api";
import { scrollToTop } from "../../utils/scrollToTop";
import { formatDateToBR } from "../../utils/Dates";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import "./styles.css";

interface MoviesCarrosselInterface {
  title: string;
  route?: string;
  data?: IMovieList[];
  autoScroll?: boolean;
}

const baseImgUrl = "https://image.tmdb.org/t/p/w780/";

const MoviesCarrossel: FC<MoviesCarrosselInterface> = ({
  title,
  route,
  data,
  autoScroll,
}) => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<IMovieList[]>(data ? data : []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!route) return;

      try {
        setLoading(true);

        const response = await api.get(route, {
          params: {
            page: 1,
          },
        });

        setMovies(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [route]);

  const navigateToMovie = (movieId: number) => {
    navigate(`/moviedetails/${movieId}`);
    autoScroll && scrollToTop();
  };

  if (loading && !data) {
    return <LoadingSpinner />;
  }

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
        {movies.length === 0 ? (
          <div className="theme-primary-color d-flex justify-content-center">
            Nenhum filme encontrado 🥺
          </div>
        ) : (
          <Carousel
            interval={null}
            indicators={false}
            prevIcon={
              movies.length <= 4 ? (
                <></>
              ) : (
                <span className="prev-icon">&#10094;</span>
              )
            }
            nextIcon={
              movies.length <= 4 ? (
                <></>
              ) : (
                <span className="next-icon">&#10095;</span>
              )
            }
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
                            src={`${baseImgUrl}${movie?.poster_path}`}
                            alt={`Slide ${index * 4 + movieIndex}`}
                          />
                          <Col className="movie-details">
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip
                                  style={{
                                    position: "absolute",
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
        )}
      </Row>
    </Container>
  );
};

export default MoviesCarrossel;
