import ReviewEntity from "../entities/Review.entity";

import { ReviewRepository } from "../repositories/ReviewRepository";

export class FindByUserUseCase {
  private reviewRepository: ReviewRepository = new ReviewRepository();

  async execute(movieId: number, userId: number): Promise<ReviewEntity | null> {
    return await this.reviewRepository.findByUser(movieId, userId);
  }
}
