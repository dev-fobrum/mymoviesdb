import { Request, Response } from "express";

import RequestWithJwt from "../../interfaces/RequestWithJwt.interface";

import { FindAllUseCase } from "./use-cases/find-all-use-case";
import { FindOneUseCase } from "./use-cases/find-one-use-case";
import { CreateFavoriteUseCase } from "./use-cases/create-favorite-use-case";
import { RemoveFavoriteUseCase } from "./use-cases/remove-favorite-use-case";

import FindAllDto from "./dtos/FindAll.dto";
import CreateFavoriteDto from "./dtos/CreateFavorite.dto";

export class FavoriteController {
  private findAllUseCase: FindAllUseCase = new FindAllUseCase();
  private findOneUseCase: FindOneUseCase = new FindOneUseCase();
  private createFavoriteUseCase: CreateFavoriteUseCase =
    new CreateFavoriteUseCase();
  private removeFavoriteUseCase: RemoveFavoriteUseCase =
    new RemoveFavoriteUseCase();

  async findAll(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const userId: number | undefined = req?.userId;
      const query: FindAllDto = {
        page: parseInt(req.query.page as string, 10),
        query: req.query.query as string,
        ordering: req.query.ordering as string,
        // genres: req.query.genres as string[],
      };

      if (!userId) {
        res.status(500).json({ error: "User is required" });
        return;
      }

      const favorites = await this.findAllUseCase.execute(query, userId);
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
      const body: CreateFavoriteDto = req.body;
      const userId: number | undefined = req?.userId;

      if (!userId) {
        throw new Error("Usuário não fornecido");
      }

      const favorites = await this.createFavoriteUseCase.execute(body, userId);
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

      const favorites = await this.removeFavoriteUseCase.execute(
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
