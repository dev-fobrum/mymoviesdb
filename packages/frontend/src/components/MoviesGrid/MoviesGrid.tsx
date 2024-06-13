import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Col, Container, Row, Tooltip } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { FaStar, FaCalendar } from "react-icons/fa";

import Pagination from "../Pagination/Pagination";
import { mockMovies } from "./mock";

import "./styles.css";

interface MoviesGridInterface {
  title: string;
}

const mockImage = "https://via.placeholder.com/100x150";
const baseImgUrl = "https://image.tmdb.org/t/p/w780/";

const SeeMore = { title: "Ver mais...", genre: "", poster_path: mockImage };

const MoviesGrid: FC<MoviesGridInterface> = ({ title }) => {
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
        <Col>
          <div className="display-5 mt-4 mb-3 section-title">{title}</div>
        </Col>
      </Row>

      <Container>
        <Row>
          {mockMovies.results.map((item, index) => {
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
                    <div>
                      <FaCalendar /> {formatDate(item.release_date)}
                    </div>
                    <div>
                      <FaStar /> {item.vote_average}
                    </div>
                  </Col>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Container>
        <Pagination itemsCount={1000} itemsPerPage={20} />
      </Container>
    </Container>
  );
};

export default MoviesGrid;
