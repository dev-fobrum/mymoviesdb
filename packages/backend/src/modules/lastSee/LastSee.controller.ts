import { Request, Response } from "express";

import RequestWithJwt from "../../interfaces/RequestWithJwt.interface";

import { FindAllUseCase } from "./use-cases/find-all-use-case";
import { FindOneUseCase } from "./use-cases/find-one-use-case";
import { CreateLastSeeUseCase } from "./use-cases/create-favorite-use-case";
import { RemoveLastSeeUseCase } from "./use-cases/remove-favorite-use-case";

export class LastSeeController {
  private findAllUseCase: FindAllUseCase = new FindAllUseCase();
  private findOneUseCase: FindOneUseCase = new FindOneUseCase();
  private createLastSeeUseCase: CreateLastSeeUseCase =
    new CreateLastSeeUseCase();
  private removeLastSeeUseCase: RemoveLastSeeUseCase =
    new RemoveLastSeeUseCase();

  async findAll(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const favorites = await this.findAllUseCase.execute();
      res.json(favorites);
    } catch (error: any) {
      console.error("Error finding favorites:", error);
      res.status(500).json({ error: error?.message });
    }
  }

  async findOne(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const movieId: number = parseInt(req.params.movieId);
      const userId: number | undefined = req?.userId;

      if (!movieId || !userId) {
        throw new Error("Usuário ou id do filme não fornecido");
      }

      const favorite = await this.findOneUseCase.execute(movieId, userId);
      res.json(favorite);
    } catch (error: any) {
      console.error("Error finding favorites:", error);
      res.status(500).json({ error: error?.message });
    }
  }

  async create(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const movieId = req.body.movieId;
      const userId: number | undefined = req?.userId;

      if (!movieId || !userId) {
        throw new Error("Usuário ou id do filme não fornecido");
      }

      const favorites = await this.createLastSeeUseCase.execute(
        movieId,
        userId
      );
      res.status(201).json(favorites);
    } catch (error: any) {
      console.error("Error creating favorites:", error);
      res.status(500).json({ error: error?.message });
    }
  }

  async remove(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const movieId: number = parseInt(req.params.movieId);
      const userId: number | undefined = req?.userId;

      if (!movieId || !userId) {
        throw new Error("Usuário ou id do filme não fornecido");
      }

      const favorites = await this.removeLastSeeUseCase.execute(
        movieId,
        userId
      );
      res.json(favorites);
    } catch (error: any) {
      console.error("Error creating favorites:", error);
      res.status(500).json({ error: error?.message });
    }
  }
}
