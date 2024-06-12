import express from "express";

import { AuthController } from "./Auth.controller";

const router = express.Router();

const authController = new AuthController();

router.post("/login", (req, res) => authController.login(req, res));
router.post("/forgot-password", (req, res) =>
  authController.forgotPassword(req, res)
);

export default router;
