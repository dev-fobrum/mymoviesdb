import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export default interface RequestWithJwt extends Request {
  userId?: number | undefined;
}
