import ReviewEntity from "../entities/Review.entity";

import { CreateReviewDto } from "../dtos/CreateReview.dto";
import { UpdateReviewDto } from "../dtos/UpdateReview.dto";

export interface IReviewRepository {
  findAll(userId: number): Promise<ReviewEntity[]>;
  findOne(reviewId: number, userId: number): Promise<ReviewEntity | null>;
  findByUser(movieId: number, userId: number): Promise<ReviewEntity | null>;
  create(body: CreateReviewDto, userId: number): Promise<ReviewEntity>;
  update(body: UpdateReviewDto, userId: number): Promise<number>;
  remove(reviewId: number, userId: number): Promise<number>;
}
