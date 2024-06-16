import { FC, useEffect, useState } from "react";
import { Carousel, Col, Container, Row, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import IMovieCredit from "../../interfaces/MovieCredits.interface";

import { api } from "../../services/api";

import "./styles.css";

interface MovieCreditsInterface {
  title?: string;
  route?: string;
  data?: IMovieCredit[];
}

const baseImgUrl = "https://image.tmdb.org/t/p/w780/";

const MovieCredits: FC<MovieCreditsInterface> = ({
  title = "Atores",
  route,
  data,
}) => {
  const navigate = useNavigate();

  const [cast, setCast] = useState<IMovieCredit[]>(data ? data : []);

  useEffect(() => {
    async function fetchData() {
      if (!route) return;

      const response = await api.get(route, {
        params: {
          page: 1,
        },
      });

      setCast(response.data.cast);
    }

    fetchData();
  }, []);

  const navigateToMovie = (movieId: number) => {
    navigate(`/actordetails/${movieId}`);
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
          {cast.length === 0 ? (
            <div className="theme-primary-color d-flex justify-content-center">
              Nenhum ator encontrado 🥺
            </div>
          ) : (
            <></>
          )}
          <Carousel
            interval={null}
            indicators={false}
            prevIcon={
              cast.length <= 4 ? (
                <></>
              ) : (
                <span className="prev-icon">&#10094;</span>
              )
            }
            nextIcon={
              cast.length <= 4 ? (
                <></>
              ) : (
                <span className="next-icon">&#10095;</span>
              )
            }
          >
            {[...Array(Math.ceil(cast.length / 3))].map((_, index) => (
              <Carousel.Item key={index} className="cursor-pointer">
                <Row>
                  {cast
                    .slice(index * 3, index * 3 + 3)
                    .map((element, movieIndex) => (
                      <Col
                        key={element.id}
                        md={4}
                        onClick={() => navigateToMovie(element.id)}
                      >
                        <div>
                          <img
                            className="d-block w-100"
                            src={`${baseImgUrl}${element?.profile_path}`}
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
                                  {element.character}
                                </Tooltip>
                              }
                            >
                              <div className="cast-character">
                                {element.character}
                              </div>
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip
                                  style={{
                                    position:
                                      "absolute" /** Havia um erro de barra vertical e foi necessário essa correção */,
                                  }}
                                >
                                  {element.name}
                                </Tooltip>
                              }
                            >
                              <div className="cast-name">{element.name}</div>
                            </OverlayTrigger>
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

export default MovieCredits;
