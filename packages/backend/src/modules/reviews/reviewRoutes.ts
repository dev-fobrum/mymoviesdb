import express from "express";

import RequestWithJwt from "../../interfaces/RequestWithJwt.interface";

import { ReviewController } from "./Review.controller";

import { VerifyToken } from "../../middlewares/auth.guard";

const router = express.Router();

const reviewController = new ReviewController();

router.get("/reviews", VerifyToken, (req: RequestWithJwt, res) =>
  reviewController.findAll(req, res)
);

router.post("/reviews", VerifyToken, (req: RequestWithJwt, res) =>
  reviewController.create(req, res)
);

router.put("/reviews/:reviewId", VerifyToken, (req: RequestWithJwt, res) =>
  reviewController.update(req, res)
);

router.delete("/reviews/:reviewId", VerifyToken, (req: RequestWithJwt, res) =>
  reviewController.remove(req, res)
);

router.get("/reviews/movie/:movieId", VerifyToken, (req: RequestWithJwt, res) =>
  reviewController.findByUser(req, res)
);

router.get("/reviews/:reviewId", VerifyToken, (req: RequestWithJwt, res) =>
  reviewController.findOne(req, res)
);

export default router;
