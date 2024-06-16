import CreateFavoriteDto from "../dtos/CreateFavorite.dto";
import FavorityEntity from "../entities/Favorite.entity";

import { FavoriteRepository } from "../repositories/UserRepository";

export class CreateFavoriteUseCase {
  private favoriteRepository: FavoriteRepository = new FavoriteRepository();

  async execute(
    body: CreateFavoriteDto,
    userId: number
  ): Promise<FavorityEntity> {
    return await this.favoriteRepository.create(body, userId);
  }
}
