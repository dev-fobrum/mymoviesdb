import { CreateReviewDto } from "../dtos/CreateReview.dto";

import ReviewEntity from "../entities/Review.entity";

import { ReviewRepository } from "../repositories/ReviewRepository";

export class CreateReviewUseCase {
  private reviewRepository: ReviewRepository = new ReviewRepository();

  async execute(body: CreateReviewDto, userId: number): Promise<ReviewEntity> {
    return await this.reviewRepository.create(body, userId);
  }
}
