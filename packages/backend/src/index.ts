require("dotenv").config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import sequelize from "./instance";

import { VerifyToken } from "./middlewares/auth.guard";

import AuthRoutes from "./modules/auth/authRoutes";
import FavoritesRoutes from "./modules/favorites/favoriteRoutes";
import LastSeeRoutes from "./modules/lastSee/lastSeeRoutes";
import MoviesRoutes from "./modules/movies/movieRoutes";
import PersonsRoutes from "./modules/persons/personsRoutes";
import ReviewRoutes from "./modules/reviews/reviewRoutes";
import UserRoutes from "./modules/users/userRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(AuthRoutes);
app.use(FavoritesRoutes);
app.use(LastSeeRoutes);
app.use(MoviesRoutes);
app.use(PersonsRoutes);
app.use(ReviewRoutes);
app.use(UserRoutes);

app.get("/dashboard", VerifyToken, (req, res) => {
  res.json({
    message: "Rota protegida. Informações do usuário:",
    user: 1,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
  });
