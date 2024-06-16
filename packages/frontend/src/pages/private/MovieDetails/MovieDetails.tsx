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
import { IoIosHeart, IoIosHeartDislike } from "react-icons/io";

import { api, apiRoutes } from "../../../services/api";

import AvaliationModal from "../../../components/ReviewModal/ReviewModal";

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
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      if (!movieId) return;

      const movie = await api.get(apiRoutes.movies.movieDetails(movieId));
      const similar = await api.get(apiRoutes.movies.similar(movieId));
      const favorite = await api.get(apiRoutes.favorites.findOne(movieId));

      setMovie(movie.data);
      setSimilar(similar.data.results);
      setIsFavorited(favorite.data ? true : false);

      await api.post(apiRoutes.lastSee.create, {
        movieId,
      });
    }

    fetchData();
  }, [movieId]);

  const handleAddFavorite = async () => {
    try {
      if (!movieId) return;

      const response = await api.post(apiRoutes.favorites.create, {
        movieId: movie?.id,
        name: movie?.title,
        releaseDate: movie?.release_date,
        popularity: movie?.popularity,
      });

      if (response.status === 201) {
        setIsFavorited(true);
      }
    } catch (error) {
      console.error("Error adding favorites");
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      if (!movieId) return;

      const response = await api.delete(apiRoutes.favorites.remove(movieId));

      if (response.status === 200) {
        setIsFavorited(false);
      }
    } catch (error) {
      console.error("Error adding favorites");
    }
  };

  if (!movie) {
    return <></>;
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
            <Button
              variant="light"
              className="me-2 theme-btn"
              onClick={
                isFavorited
                  ? () => handleRemoveFavorite()
                  : () => handleAddFavorite()
              }
            >
              {isFavorited ? <IoIosHeartDislike /> : <IoIosHeart />}
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
      {Array.isArray(similar) && similar.length === 0 ? (
        <div className="theme-primary-color d-flex justify-content-center">
          Nenhum filme encontrado 🥺
        </div>
      ) : (
        <></>
      )}

      <AvaliationModal
        movieId={movieId}
        movieTitle={movie.title}
        show={show}
        setShow={setShow}
      />
    </Container>
  );
};

export default MovieDetails;
