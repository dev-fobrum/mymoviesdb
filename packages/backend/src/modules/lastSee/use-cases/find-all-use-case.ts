import axios from "axios";
import FavorityEntity from "../entities/LastSee.entity";

import { LastSeeRepository } from "../repositories/LastSeeRepository";
import { FindMovieUseCase } from "../../movies/use-cases/find-movie-use-case";

export class FindAllUseCase {
  private lastSeeRepository: LastSeeRepository = new LastSeeRepository();

  private findMovieUseCase: FindMovieUseCase = new FindMovieUseCase();

  async formatFavorite(favorites: any[]) {
    return await Promise.all(
      favorites.map(async (favorite) => {
        try {
          const { data } = await this.findMovieUseCase.execute(
            favorite.movieId
          );

          return data;
        } catch (error) {
          console.error("Erro ao buscar informações do filme:", error);
          throw error;
        }
      })
    );
  }

  async execute(userId: number): Promise<any> {
    const lastSee = await this.lastSeeRepository.findAll(userId);

    const results = await this.formatFavorite(lastSee);

    const formated = {
      page: 1,
      results,
      total_pages: 1,
      total_results: lastSee.length,
    };

    return formated;
  }
}
