import React, { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Tooltip, Spinner } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useSelector } from "react-redux";
import { FaStar, FaCalendar } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

import Pagination from "../Pagination/Pagination";

import { api } from "../../services/api";

import IMovieList from "../../interfaces/MovieList.interface";

import { formatDateToBR } from "../../utils/Dates";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"; // Importando o componente de LoadingSpinner

import "./styles.css";

interface MoviesGridInterface {
  title?: string;
  filter: string;
  route: string;
}

const baseImgUrl = "https://image.tmdb.org/t/p/w780/";

const MoviesGrid: FC<MoviesGridInterface> = ({ title, filter, route }) => {
  const navigate = useNavigate();
  const filters = useSelector((state: any) => state.filters[filter]);

  const [movies, setMovies] = useState<IMovieList[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get(route, {
        params: {
          ...filters,
        },
      });

      setTotalItems(response.data.total_results);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, route]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const navigateToMovie = (movieId: number) => {
    navigate(`/moviedetails/${movieId}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

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
            <div className="theme-primary-color d-flex justify-content-center">
              Nenhum filme encontrado 🥺
            </div>
          ) : (
            <>
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
                        src={`${baseImgUrl}${
                          item?.backdrop_path || item.poster_path
                        }`}
                        alt={`Slide ${index * 4 + index}`}
                        height={140}
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
            </>
          )}
        </Row>
      </Container>

      <Container>
        <Pagination
          itemsCount={filter === "featuredFilters" ? 10000 : totalItems}
          itemsPerPage={20}
          filter={filter}
        />
      </Container>
    </Container>
  );
};

export default MoviesGrid;
