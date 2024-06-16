import { UpdateReviewDto } from "../dtos/UpdateReview.dto";

import { ReviewRepository } from "../repositories/ReviewRepository";

export class UpdateReviewUseCase {
  private reviewRepository: ReviewRepository = new ReviewRepository();

  async execute(body: UpdateReviewDto, userId: number): Promise<Number> {
    return await this.reviewRepository.update(body, userId);
  }
}
