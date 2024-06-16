import ReviewEntity from "../entities/Review.entity";

import { IReviewRepository } from "../interfaces/ReviewRepository.interface";

import Review from "../entities/Review.entity";
import { CreateReviewDto } from "../dtos/CreateReview.dto";
import { UpdateReviewDto } from "../dtos/UpdateReview.dto";

export class ReviewRepository implements IReviewRepository {
  async findAll(userId: number): Promise<ReviewEntity[]> {
    const reviews = await ReviewEntity.findAll({
      where: {
        userId,
      },
      order: [["updatedAt", "ASC"]],
    });

    return reviews.reverse();
  }

  async findOne(
    reviewId: number,
    userId: number
  ): Promise<ReviewEntity | null> {
    const review = await ReviewEntity.findOne({
      where: {
        id: reviewId,
        userId,
      },
    });

    return review;
  }

  async findByUser(
    movieId: number,
    userId: number
  ): Promise<ReviewEntity | null> {
    const review = await ReviewEntity.findOne({
      where: {
        movieId,
        userId,
      },
    });

    return review;
  }

  async create(body: CreateReviewDto, userId: number): Promise<Review> {
    const created = await ReviewEntity.create({
      ...body,
      userId,
      createdAt: new Date(),
    });

    return created;
  }

  async update(body: UpdateReviewDto, userId: number): Promise<number> {
    const updated = await ReviewEntity.update(
      {
        ...body,
        userId,
        updateAt: new Date(),
      },
      {
        where: {
          id: body.reviewId,
        },
      }
    );

    return updated[0];
  }

  async remove(reviewId: number, userId: number): Promise<number> {
    const removed = await ReviewEntity.destroy({
      where: {
        id: reviewId,
        userId,
      },
    });

    return removed;
  }
}
