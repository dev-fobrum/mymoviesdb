import express from "express";

import RequestWithJwt from "../../interfaces/RequestWithJwt.interface";

import { UserController } from "./User.controller";

import { VerifyToken } from "../../middlewares/auth.guard";

const router = express.Router();

const userController = new UserController();

router.get("/users", (req, res) => userController.findAll(req, res));
router.post("/users", (req, res) => userController.create(req, res));

router.get("/findProfile", VerifyToken, (req: RequestWithJwt, res) =>
  userController.findOne(req, res)
);
router.put("/users", VerifyToken, (req: RequestWithJwt, res) =>
  userController.update(req, res)
);

export default router;
