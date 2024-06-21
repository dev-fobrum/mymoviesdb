import { FindMovieUseCase } from "../../movies/use-cases/find-movie-use-case";

import { FavoriteRepository } from "../repositories/UserRepository";

import FindAllDto from "../dtos/FindAll.dto";

export class FindAllUseCase {
  private favoriteRepository: FavoriteRepository = new FavoriteRepository();

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

  async execute(query: FindAllDto, userId: number): Promise<any> {
    const favorites = await this.favoriteRepository.findAll(query, userId);

    const results = await this.formatFavorite(favorites.data);

    const formated = {
      page: query?.page || 1,
      results,
      total_pages: Math.round(favorites.count / 20),
      total_results: favorites.count,
    };

    return formated;
  }
}
