import React, { useState } from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import {
  FaHeart,
  FaEye,
  FaStar,
  FaPlay,
  FaPause,
  FaPencilAlt,
} from "react-icons/fa";

import "./styles.css";
import AvaliationModal from "../../../components/AvaliationModal/AvaliationModal";

const movieDetails = {
  title: "Inception",
  year: 2010,
  genre: "Action, Adventure, Sci-Fi",
  duration: "2h 28min",
  rating: "PG-13",
  posterUrl: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
  plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
  cast: [
    { name: "Leonardo DiCaprio", img: "https://via.placeholder.com/150" },
    { name: "Joseph Gordon-Levitt", img: "https://via.placeholder.com/150" },
    { name: "Elliot Page", img: "https://via.placeholder.com/150" },
  ],
  soundtrack: [
    { title: "Time", length: "4:35" },
    { title: "Dream is Collapsing", length: "2:28" },
    { title: "Mombasa", length: "4:54" },
  ],
};

const MovieDetails = () => {
  const [show, setShow] = useState(false);

  return (
    <Container className="page-movie-details">
      <Row className="mt-4">
        <Col md={4}>
          <Image src={movieDetails.posterUrl} rounded fluid />
        </Col>
        <Col md={8}>
          <h2>{movieDetails.title}</h2>
          <p>
            {movieDetails.year} | {movieDetails.genre} | {movieDetails.duration}{" "}
            | {movieDetails.rating}
          </p>
          <div>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color="gold" />
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
          <p>{movieDetails.plot}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={8}>
          <h4>Atores</h4>
          <Row>
            {movieDetails.cast.map((actor, index) => (
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
            {movieDetails.soundtrack.map((track, index) => (
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

      <AvaliationModal
        movieTitle={movieDetails.title}
        show={show}
        setShow={setShow}
      />
    </Container>
  );
};

export default MovieDetails;
