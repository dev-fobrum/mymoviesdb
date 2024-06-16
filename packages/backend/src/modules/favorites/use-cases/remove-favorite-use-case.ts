import FavorityEntity from "../entities/Favorite.entity";

import { FavoriteRepository } from "../repositories/UserRepository";

export class RemoveFavoriteUseCase {
  private favoriteRepository: FavoriteRepository = new FavoriteRepository();

  async execute(movieId: number, userId: number): Promise<number> {
    return await this.favoriteRepository.remove(movieId, userId);
  }
}
