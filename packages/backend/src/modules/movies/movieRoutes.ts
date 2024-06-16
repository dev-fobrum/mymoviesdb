import express from "express";

import RequestWithJwt from "../../interfaces/RequestWithJwt.interface";

import { MoviesController } from "./Movies.controller";

import { VerifyToken } from "../../middlewares/auth.guard";

const router = express.Router();

const moviesController = new MoviesController();

router.get("/movies/discover", VerifyToken, (req, res) =>
  moviesController.discover(req, res)
);

router.get("/movies/trending", VerifyToken, (req, res) =>
  moviesController.findTrending(req, res)
);

router.get("/movies/genres", VerifyToken, (req, res) =>
  moviesController.findGenres(req, res)
);

router.get("/movies/search", VerifyToken, (req, res) =>
  moviesController.searchMovie(req, res)
);

router.get("/movies/credits/:id", VerifyToken, (req, res) =>
  moviesController.findCredits(req, res)
);

router.get("/movies/similar/:id", VerifyToken, (req, res) =>
  moviesController.findSimilar(req, res)
);

router.get("/movies/:id", VerifyToken, (req, res) =>
  moviesController.findMovie(req, res)
);

export default router;
