import express from "express";

import RequestWithJwt from "../../interfaces/RequestWithJwt.interface";

import { LastSeeController } from "./LastSee.controller";

import { VerifyToken } from "../../middlewares/auth.guard";

const router = express.Router();

const lastSeeController = new LastSeeController();

router.get("/lastsee", VerifyToken, (req: RequestWithJwt, res) =>
  lastSeeController.findAll(req, res)
);

router.post("/lastsee", VerifyToken, (req: RequestWithJwt, res) =>
  lastSeeController.create(req, res)
);

router.delete("/lastsee/:movieId", VerifyToken, (req: RequestWithJwt, res) =>
  lastSeeController.remove(req, res)
);

router.get("/lastsee/:movieId", VerifyToken, (req: RequestWithJwt, res) =>
  lastSeeController.findOne(req, res)
);

export default router;
