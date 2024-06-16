import express from "express";

import { PersonsController } from "./Persons.controller";

import { VerifyToken } from "../../middlewares/auth.guard";

const router = express.Router();

const personsController = new PersonsController();

router.get("/persons/:id", VerifyToken, (req, res) =>
  personsController.findActor(req, res)
);

router.get("/persons/movies/:id", VerifyToken, (req, res) =>
  personsController.findActorMovies(req, res)
);

export default router;
