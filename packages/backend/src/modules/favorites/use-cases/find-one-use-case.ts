import FavorityEntity from "../entities/Favorite.entity";

import { FavoriteRepository } from "../repositories/UserRepository";

export class FindOneUseCase {
  private favoriteRepository: FavoriteRepository = new FavoriteRepository();

  async execute(
    movieId: number,
    userId: number
  ): Promise<FavorityEntity | null> {
    return await this.favoriteRepository.findOne(movieId, userId);
  }
}
