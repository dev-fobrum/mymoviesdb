import express from "express";

import { UserController } from "./User.controller";

const router = express.Router();

const userController = new UserController();

router.get("/users", (req, res) => userController.findAll(req, res));
router.post("/users", (req, res) => userController.create(req, res));

export default router;
