require("dotenv").config();

import express from "express";
import cors from "cors";

import sequelize from "./instance";

import UserRoutes from "./modules/users/userRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(UserRoutes);

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
