import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import {
  FaHeart,
  FaEye,
  FaStar,
  FaPlay,
  FaPause,
  FaPencilAlt,
} from "react-icons/fa";

import { api, apiRoutes } from "../../../services/api";

import AvaliationModal from "../../../components/AvaliationModal/AvaliationModal";

import IMovie from "../../../interfaces/Movie.interface";
import IMovieList from "../../../interfaces/MovieList.interface";

import { formatDateToBR } from "../../../utils/Dates";

import "./styles.css";
import MoviesCarrossel from "../../../components/MoviesCarrossel/MoviesCarrossel";

const baseImgUrl = "https://image.tmdb.org/t/p/w780/";

const MovieDetails = () => {
  const { movieId } = useParams();

  const [show, setShow] = useState(false);
  const [movie, setMovie] = useState<IMovie>();
  const [similar, setSimilar] = useState<IMovieList[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!movieId) return;

      const movie = await api.get(apiRoutes.movies.movieDetails(movieId));
      const similar = await api.get(apiRoutes.movies.similar(movieId));

      console.log("devlog similar", similar);

      setMovie(movie.data);
      setSimilar(similar.data.results);
    }

    fetchData();
  }, [movieId]);

  if (!movie || similar.length === 0) {
    return <>teste</>;
  }

  return (
    <Container className="page-movie-details">
      <Row className="mt-4">
        <Col md={4}>
          <Image src={`${baseImgUrl}${movie.poster_path}`} rounded fluid />
        </Col>
        <Col md={8}>
          <h2>{movie.title}</h2>
          <p>
            {formatDateToBR(movie.release_date)} |{" "}
            {movie.genres.map((g) => g.name).join(", ")} | {movie.runtime} min.
          </p>
          <div>
            {[...Array(5)].map((_, i) => (
              <span title={String(movie.vote_average)}>
                <FaStar
                  key={i}
                  color={
                    Math.floor(movie.vote_average / 2) >= i
                      ? "rgb(97, 218, 251)"
                      : "black"
                  }
                />
              </span>
            ))}
          </div>
          <div className="mt-2">
            <Button variant="light" className="me-2 theme-btn">
              <FaHeart />
            </Button>
            <Button variant="light" className="me-2 theme-btn">
              <FaEye />
            </Button>
            <Button
              variant="light"
              className="me-2 theme-btn"
              onClick={() => setShow(true)}
            >
              <FaPencilAlt />
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>Sinopse</h4>
          <p>{movie.overview}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={8}>
          <h4>Atores</h4>
          <Row>
            {[{ name: "Mock", img: "" }].map((actor, index) => (
              <Col key={index} md={4} className="text-center">
                <Image src={actor.img} rounded fluid />
                <p>{actor.name}</p>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <h4>Trilha Sonora</h4>
          <ul className="list-unstyled">
            {[{ title: "mock", length: "1:00" }].map((track, index) => (
              <li key={index} className="d-flex align-items-center mb-2">
                <Button variant="light" className="me-2 theme-btn">
                  <FaPlay />
                </Button>
                <span>
                  {track.title} - {track.length}
                </span>
              </li>
            ))}
          </ul>
        </Col>
      </Row>

      <MoviesCarrossel title="Você também pode gostar de..." data={similar} />

      <AvaliationModal movieTitle={movie.title} show={show} setShow={setShow} />
    </Container>
  );
};

export default MovieDetails;
