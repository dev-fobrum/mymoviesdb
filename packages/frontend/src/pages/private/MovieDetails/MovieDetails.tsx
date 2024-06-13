import React from "react";
import { useParams } from "react-router-dom";

const MovieDetails: React.FC = () => {
  const { movieId } = useParams<string>();

  return (
    <div className="display-5 mt-4 mb-3 section-title">
      <h1>Detalhes do Filme</h1>
      <p>ID do Filme: {movieId}</p>
    </div>
  );
};

export default MovieDetails;
