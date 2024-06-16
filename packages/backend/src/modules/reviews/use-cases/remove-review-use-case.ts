import { ReviewRepository } from "../repositories/ReviewRepository";

export class RemoveReviewUseCase {
  private reviewRepository: ReviewRepository = new ReviewRepository();

  async execute(movieId: number, userId: number): Promise<number> {
    return await this.reviewRepository.remove(movieId, userId);
  }
}
