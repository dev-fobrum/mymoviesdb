import axios from "axios";

export class FindSimilarUseCase {
  async execute(movieId: string): Promise<any> {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/movie/${movieId}/similar`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_JWT_TOKEN}`,
        },
        params: {
          // api_key: process.env.TMDB_TOKEN,
          language: "pt-BR",
        },
      }
    );

    return response;
  }
}
