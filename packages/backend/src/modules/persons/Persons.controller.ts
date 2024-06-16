import { Response } from "express";

import RequestWithJwt from "../../interfaces/RequestWithJwt.interface";

import { FindActorsUseCase } from "./use-cases/find-actor-use-case";
import { FindActorMoviesUseCase } from "./use-cases/find-actor-movies-use-case";

export class PersonsController {
  private findActorsUseCase: FindActorsUseCase = new FindActorsUseCase();
  private findActorMoviesUseCase: FindActorMoviesUseCase =
    new FindActorMoviesUseCase();

  async findActor(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const actorId: string = req.params.id;

      const response = await this.findActorsUseCase.execute(actorId);

      res.json(response.data);
    } catch (error) {
      console.error("Erro ao obter detalhes do ator:", error);
      res.status(500).send("Erro ao obter detalhes do ator");
    }
  }

  async findActorMovies(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const actorId: string = req.params.id;

      const response = await this.findActorMoviesUseCase.execute(actorId);

      res.json(response.data);
    } catch (error) {
      console.error("Erro ao obter filmes do ator:", error);
      res.status(500).send("Erro ao obter filmes do ator");
    }
  }
}
