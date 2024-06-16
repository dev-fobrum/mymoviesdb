import { Request, Response, NextFunction } from "express";
import { JwtPayload, VerifyErrors } from "jsonwebtoken";
import RequestWithJwt from "../interfaces/RequestWithJwt.interface";

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
    (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }

      (req as RequestWithJwt).userId = decoded?.id;

      next();
    }
  );
};
