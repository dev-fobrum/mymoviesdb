import axios from "axios";

import DiscoverDto from "../dtos/Discover.dto";

export class DiscoverUseCase {
  fromToOrdering(from: string) {
    let to: string = "";
    switch (from) {
      case "Título (A-Z)":
        to = "title.asc";
        break;
      case "Título (Z-A)":
        to = "title.desc";
        break;
      case "Popularidade":
        to = "popularity.desc";
        break;
      case "Data de Lançamento":
        to = "primary_release_date.desc";
        break;
      default:
        to = "popularity.desc";
    }

    return to;
  }

  async execute(query: DiscoverDto): Promise<any> {
    console.log("devlog query", query);
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
            sort_by: this.fromToOrdering(query.ordering),
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
