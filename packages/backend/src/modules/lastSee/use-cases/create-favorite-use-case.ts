import FavorityEntity from "../entities/LastSee.entity";

import { LastSeeRepository } from "../repositories/LastSeeRepository";

export class CreateLastSeeUseCase {
  private lastSeeRepository: LastSeeRepository = new LastSeeRepository();

  async execute(movieId: number, userId: number): Promise<FavorityEntity> {
    return await this.lastSeeRepository.create(movieId, userId);
  }
}
