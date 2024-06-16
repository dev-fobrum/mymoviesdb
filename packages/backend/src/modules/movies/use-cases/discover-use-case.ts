import axios from "axios";

import DiscoverDto from "../dtos/Discover.dto";

import { fromToOrdering } from "../../../utils/FromToOrdering";

export class DiscoverUseCase {
  async execute(query: DiscoverDto): Promise<any> {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/discover/movie`,
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
          ...(query?.ordering && {
            sort_by: fromToOrdering(query.ordering),
          }),
          ...(query?.genres && {
            with_genres: query.genres.join(","),
          }),
        },
      }
    );

    return response;
  }
}
