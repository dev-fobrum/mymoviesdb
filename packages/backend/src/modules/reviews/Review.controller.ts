import { Request, Response } from "express";

import RequestWithJwt from "../../interfaces/RequestWithJwt.interface";

import { FindAllUseCase } from "./use-cases/find-all-use-case";
import { FindOneUseCase } from "./use-cases/find-one-use-case";
import { FindByUserUseCase } from "./use-cases/find-by-user-use-case";
import { CreateReviewUseCase } from "./use-cases/create-review-use-case";
import { UpdateReviewUseCase } from "./use-cases/update-review-use-case";
import { RemoveReviewUseCase } from "./use-cases/remove-review-use-case";

import { CreateReviewDto } from "./dtos/CreateReview.dto";
import { UpdateReviewDto } from "./dtos/UpdateReview.dto";

export class ReviewController {
  private findAllUseCase: FindAllUseCase = new FindAllUseCase();
  private findOneUseCase: FindOneUseCase = new FindOneUseCase();
  private findByUserUseCase: FindByUserUseCase = new FindByUserUseCase();

  private createReviewUseCase: CreateReviewUseCase = new CreateReviewUseCase();
  private updateReviewUseCase: UpdateReviewUseCase = new UpdateReviewUseCase();
  private removeReviewUseCase: RemoveReviewUseCase = new RemoveReviewUseCase();

  async findAll(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const userId: number | undefined = req?.userId;

      if (!userId) {
        throw new Error("Usuário não fornecido");
      }

      const reviews = await this.findAllUseCase.execute(userId);
      res.json(reviews);
    } catch (error: any) {
      console.error("Error finding reviews:", error);
      res.status(500).json({ error: error?.message });
    }
  }

  async findOne(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const reviewId: number = parseInt(req.params.reviewId);
      const userId: number | undefined = req?.userId;

      if (!reviewId || !userId) {
        throw new Error("Usuário ou id da avaliação não fornecido");
      }

      const review = await this.findOneUseCase.execute(reviewId, userId);
      res.json(review);
    } catch (error: any) {
      console.error("Error finding review:", error);
      res.status(500).json({ error: error?.message });
    }
  }

  async findByUser(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const movieId: number = parseInt(req.params.movieId);
      const userId: number | undefined = req?.userId;

      if (!movieId || !userId) {
        throw new Error("Usuário ou id do filme não fornecido");
      }

      const review = await this.findByUserUseCase.execute(movieId, userId);
      res.json(review);
    } catch (error: any) {
      console.error("Error finding review by user:", error);
      res.status(500).json({ error: error?.message });
    }
  }

  async create(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const body: CreateReviewDto = req.body;
      const userId: number | undefined = req?.userId;

      if (!userId) {
        throw new Error("Usuário não fornecido");
      }

      const review = await this.createReviewUseCase.execute(body, userId);
      res.status(201).json(review);
    } catch (error: any) {
      console.error("Error creating review:", error);
      res.status(500).json({ error: error?.message });
    }
  }

  async update(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const body: UpdateReviewDto = req.body;
      const userId: number | undefined = req?.userId;

      if (!userId) {
        throw new Error("Usuário não fornecido");
      }

      const review = await this.updateReviewUseCase.execute(body, userId);
      res.status(201).json(review);
    } catch (error: any) {
      console.error("Error updating review:", error);
      res.status(500).json({ error: error?.message });
    }
  }

  async remove(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const reviewId: number = parseInt(req.params.reviewId);
      const userId: number | undefined = req?.userId;

      if (!reviewId || !userId) {
        throw new Error("Usuário ou id da avaliação não fornecido");
      }

      const review = await this.removeReviewUseCase.execute(reviewId, userId);
      res.json(review);
    } catch (error: any) {
      console.error("Error deleting review:", error);
      res.status(500).json({ error: error?.message });
    }
  }
}
