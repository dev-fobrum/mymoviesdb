import axios from "axios";
import FindTrendingDto from "../dtos/FindTrending.dto";

export class FindTrendingUseCase {
  async execute(query: FindTrendingDto): Promise<any> {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/trending/movie/week?language=pt-BR`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_JWT_TOKEN}`,
        },
        params: {
          // api_key: process.env.TMDB_TOKEN,
          language: "pt-BR",
          ...query,
        },
      }
    );

    return response;
  }
}
