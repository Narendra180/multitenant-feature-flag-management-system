import "express";
import type { JwtPayloadType } from "../types";

declare global {
  namespace Express {
    interface Request {
      jwtPayload: JwtPayloadType | undefined;
    }
  }
}
