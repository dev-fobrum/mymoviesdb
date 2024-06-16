import FavorityEntity from "../entities/LastSee.entity";

import { LastSeeRepository } from "../repositories/LastSeeRepository";

export class FindOneUseCase {
  private lastSeeRepository: LastSeeRepository = new LastSeeRepository();

  async execute(
    movieId: number,
    userId: number
  ): Promise<FavorityEntity | null> {
    return await this.lastSeeRepository.findOne(movieId, userId);
  }
}
