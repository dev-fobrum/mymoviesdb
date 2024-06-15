import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { api, apiRoutes } from "../../../services/api";

import GenreChips from "../../../components/GenreChips/GenreChips";
import MoviesCarrossel from "../../../components/MoviesCarrossel/MoviesCarrossel";
import MoviesGrid from "../../../components/MoviesGrid/MoviesGrid";
import SearchTools from "../../../components/SearchTools/SearchTools";

import "./styles.css";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(apiRoutes.dashboard.get);
      setData(response.data);
    }

    fetchData();
  }, []);

  return (
    <Container>
      <GenreChips type="featured" />

      <MoviesGrid />

      <MoviesCarrossel title="Destaques" route={apiRoutes.movies.trending} />

      <MoviesCarrossel title="Visto Recentemente" />
    </Container>
  );
};

export default Dashboard;
