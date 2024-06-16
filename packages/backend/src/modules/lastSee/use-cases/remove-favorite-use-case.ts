import { LastSeeRepository } from "../repositories/LastSeeRepository";

export class RemoveLastSeeUseCase {
  private lastSeeRepository: LastSeeRepository = new LastSeeRepository();

  async execute(movieId: number, userId: number): Promise<number> {
    return await this.lastSeeRepository.remove(movieId, userId);
  }
}
