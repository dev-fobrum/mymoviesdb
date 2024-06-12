import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

export const VerifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  jwt.verify(
    token.replace("Bearer ", ""),
    process.env.SECRET_KEY,
    (err: any) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }
      next();
    }
  );
};
