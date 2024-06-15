import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Tooltip } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useSelector } from "react-redux";
import { FaStar, FaCalendar } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

import Pagination from "../Pagination/Pagination";

import { api, apiRoutes } from "../../services/api";

import IMovieList from "../../interfaces/MovieList.interface";

import { formatDateToBR } from "../../utils/Dates";

import "./styles.css";

interface MoviesGridInterface {
  title?: string;
}

const baseImgUrl = "https://image.tmdb.org/t/p/w780/";

const MoviesGrid: FC<MoviesGridInterface> = ({ title }) => {
  const navigate = useNavigate();
  const filters = useSelector((state: any) => state.filters.featuredFilters);

  const [movies, setMovies] = useState<IMovieList[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(apiRoutes.movies.discover, {
        params: {
          ...filters,
        },
      });

      setTotalItems(response.data.total_results);
      setMovies(response.data.results);
    }

    fetchData();
  }, [filters]);

  const navigateToMovie = (movieId: number) => {
    navigate(`/moviedetails/${movieId}`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="display-5 mt-4 mb-3 section-title d-flex justify-content-center">
            {title}
          </div>
        </Col>
      </Row>

      <Container>
        <Row>
          {movies.length === 0 ? (
            <div className="theme-primary-color">
              Nenhum filme encontrado 🥺
            </div>
          ) : (
            <></>
          )}
          {movies.map((item, index) => {
            return (
              <Col
                className="mb-4 cursor-pointer"
                key={item.id}
                xl={3}
                lg={4}
                md={6}
                sm={12}
                onClick={() => navigateToMovie(item.id)}
              >
                <div>
                  <img
                    className="d-block w-100"
                    src={`${baseImgUrl}${item.backdrop_path}`}
                    alt={`Slide ${index * 4 + index}`}
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
                          {item.title}
                        </Tooltip>
                      }
                    >
                      <div className="movie-title">{item.title}</div>
                    </OverlayTrigger>

                    <Row className="d-flex flex-column w-100">
                      <Col>
                        <FaCalendar /> {formatDateToBR(item.release_date)}
                      </Col>
                      <Col>
                        <Row className="d-flex flex-row">
                          <Col>
                            <FaStar /> {item.vote_average}
                          </Col>
                          <Col>
                            <FaPeopleGroup /> {item.popularity}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Container>
        <Pagination itemsCount={totalItems} itemsPerPage={20} />
      </Container>
    </Container>
  );
};

export default MoviesGrid;
