import axios from "axios";

import SearchDto from "../dtos/Search.dto";

export class SearchMovieUseCase {
  async execute(query: SearchDto): Promise<any> {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/search/movie`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_JWT_TOKEN}`,
        },
        params: {
          // api_key: process.env.TMDB_TOKEN,
          language: "pt-BR",
          page: query?.page || 1,
          ...(query?.query && {
            query: query.query,
          }),
        },
      }
    );

    return response;
  }
}
