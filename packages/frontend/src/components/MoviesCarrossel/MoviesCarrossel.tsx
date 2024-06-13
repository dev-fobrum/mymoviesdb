import { FC } from "react";
import { Carousel, Col, Container, Row, Tooltip } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { FaStar, FaCalendar } from "react-icons/fa";

import "./styles.css";
import { mockMovies } from "./mock";
import { useNavigate } from "react-router-dom";

interface MoviesCarrosselInterface {
  title: string;
  seeAllLink?: string;
}

const baseImgUrl = "https://image.tmdb.org/t/p/w780/";

const MoviesCarrossel: FC<MoviesCarrosselInterface> = ({
  title,
  seeAllLink,
}) => {
  const navigate = useNavigate();

  const navigateToMovie = (movieId: number) => {
    navigate(`/moviedetails/${movieId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <Container id={title}>
      <Row>
        <Col md={5}>
          <div className="display-5 mt-4 mb-3 section-title ">{title}</div>
        </Col>
        {seeAllLink && (
          <Col
            md={{ span: 4, offset: 3 }}
            className="d-flex align-items-center justify-content-end"
          >
            <div
              onClick={() => navigate(seeAllLink)}
              className="display-10 mt-4 mb-3 section-title cursor-pointer"
            >
              Ver todos
            </div>
          </Col>
        )}
      </Row>

      <Row>
        <Col>
          <Carousel
            interval={null}
            indicators={false}
            prevIcon={<span className="prev-icon">&#10094;</span>}
            nextIcon={<span className="next-icon">&#10095;</span>}
          >
            {[...Array(Math.ceil(mockMovies.results.length / 4))].map(
              (_, index) => (
                <Carousel.Item key={index} className="cursor-pointer">
                  <Row>
                    {mockMovies.results
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
                                <FaCalendar /> {formatDate(movie.release_date)}
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
              )
            )}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviesCarrossel;
