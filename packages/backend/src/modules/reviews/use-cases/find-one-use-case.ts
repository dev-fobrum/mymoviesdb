import ReviewEntity from "../entities/Review.entity";

import { ReviewRepository } from "../repositories/ReviewRepository";

export class FindOneUseCase {
  private reviewRepository: ReviewRepository = new ReviewRepository();

  async execute(
    reviewId: number,
    userId: number
  ): Promise<ReviewEntity | null> {
    return await this.reviewRepository.findOne(reviewId, userId);
  }
}
