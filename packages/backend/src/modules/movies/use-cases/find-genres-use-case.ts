import axios from "axios";

export class FindGenresUseCase {
  async execute(): Promise<any> {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/genre/movie/list`,
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
