import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";

import { api, apiRoutes } from "../../../services/api";

import MoviesCarrossel from "../../../components/MoviesCarrossel/MoviesCarrossel";

import IMovieList from "../../../interfaces/MovieList.interface";
import IActor from "../../../interfaces/Actor.interface";

import { formatDateToBR } from "../../../utils/Dates";

import "./styles.css";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const baseImgUrl = "https://image.tmdb.org/t/p/w780/";

const ActorDetails = () => {
  const { actorId } = useParams();

  const [actor, setActor] = useState<IActor>();
  const [movies, setMovies] = useState<IMovieList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!actorId) return;

      setLoading(true);

      try {
        const [actor, movies] = await Promise.all([
          api.get(apiRoutes.persons.actorDetails(actorId)),
          api.get(apiRoutes.persons.actorMovies(actorId)),
        ]);

        setActor(actor.data);
        setMovies(movies.data.cast);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [actorId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!actor) {
    return <></>;
  }

  return (
    <Container className="page-movie-details">
      <Row className="mt-4">
        <Col md={4}>
          <Image src={`${baseImgUrl}${actor.profile_path}`} rounded fluid />
        </Col>
        <Col md={8}>
          <h2>{actor.name}</h2>
          <p>{actor.place_of_birth}</p>
          <p>Nascimento: {formatDateToBR(actor.birthday)}</p>
          {actor?.deathday ? (
            <p>Falecimento: {formatDateToBR(actor.deathday)}</p>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>Biografia</h4>
          <p>
            {actor?.biography ? actor.biography : "Biografia não disponível 🥺"}
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <MoviesCarrossel title="Atuou em..." data={movies} />
        {Array.isArray(movies) && movies.length === 0 ? (
          <div className="theme-primary-color d-flex justify-content-center">
            Nenhum filme encontrado 🥺
          </div>
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
};

export default ActorDetails;
