import express from "express";

import RequestWithJwt from "../../interfaces/RequestWithJwt.interface";

import { FavoriteController } from "./Favorite.controller";

import { VerifyToken } from "../../middlewares/auth.guard";

const router = express.Router();

const favoriteController = new FavoriteController();

router.get("/favorites", VerifyToken, (req: RequestWithJwt, res) =>
  favoriteController.findAll(req, res)
);

router.post("/favorites", VerifyToken, (req: RequestWithJwt, res) =>
  favoriteController.create(req, res)
);

router.delete("/favorites/:movieId", VerifyToken, (req: RequestWithJwt, res) =>
  favoriteController.remove(req, res)
);

router.get("/favorites/:movieId", VerifyToken, (req: RequestWithJwt, res) =>
  favoriteController.findOne(req, res)
);

export default router;
