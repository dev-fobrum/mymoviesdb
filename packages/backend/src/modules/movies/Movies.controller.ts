import { Response } from "express";

import RequestWithJwt from "../../interfaces/RequestWithJwt.interface";

import { DiscoverUseCase } from "./use-cases/discover-use-case";
import { FindTrendingUseCase } from "./use-cases/find-trending-use-case";
import { FindMovieUseCase } from "./use-cases/find-movie-use-case";
import { FindSimilarUseCase } from "./use-cases/find-similar-use-case";
import { FindGenresUseCase } from "./use-cases/find-genres-use-case";

import FindTrendingDto from "./dtos/FindTrending.dto";
import DiscoverDto from "./dtos/Discover.dto";

export class MoviesController {
  private discoverUseCase: DiscoverUseCase = new DiscoverUseCase();
  private findTrendingUseCase: FindTrendingUseCase = new FindTrendingUseCase();
  private findMovieUseCase: FindMovieUseCase = new FindMovieUseCase();
  private findSimilarUseCase: FindSimilarUseCase = new FindSimilarUseCase();
  private findGenresUseCase: FindGenresUseCase = new FindGenresUseCase();

  async discover(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const query: DiscoverDto = {
        page: parseInt(req.query.page as string, 10),
        query: req.query.query as string,
        ordering: req.query.ordering as string,
        genres: req.query.genres as string[],
      };

      const response = await this.discoverUseCase.execute(query);

      res.json(response.data);
    } catch (error) {
      console.error("Erro ao obter filmes:", error);
      res.status(500).send("Erro ao obter filmes");
    }
  }

  async findTrending(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const query: FindTrendingDto = {
        page: parseInt(req.query.page as string, 10),
      };

      const response = await this.findTrendingUseCase.execute(query);

      res.json(response.data);
    } catch (error) {
      console.error("Erro ao obter filmes em destaque:", error);
      res.status(500).send("Erro ao obter filmes em destaque");
    }
  }

  async findMovie(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const movieId: string = req.params.id;

      const response = await this.findMovieUseCase.execute(movieId);

      res.json(response.data);
    } catch (error) {
      console.error("Erro ao obter detalhes do filme:", error);
      res.status(500).send("Erro ao obter detalhes do filme");
    }
  }

  async findSimilar(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const movieId: string = req.params.id;

      const response = await this.findSimilarUseCase.execute(movieId);

      res.json(response.data);
    } catch (error) {
      console.error("Erro ao obter filmes semelhantes:", error);
      res.status(500).send("Erro ao obter filmes semelhantes");
    }
  }

  async findGenres(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const response = await this.findGenresUseCase.execute();

      res.json(response.data);
    } catch (error) {
      console.error("Erro ao obter gêneros:", error);
      res.status(500).send("Erro ao obter gêneros");
    }
  }
}
