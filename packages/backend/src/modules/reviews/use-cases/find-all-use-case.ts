import { ReviewRepository } from "../repositories/ReviewRepository";

export class FindAllUseCase {
  private reviewRepository: ReviewRepository = new ReviewRepository();

  async execute(userId: number): Promise<any> {
    const reviews = await this.reviewRepository.findAll(userId);

    return reviews;
  }
}
