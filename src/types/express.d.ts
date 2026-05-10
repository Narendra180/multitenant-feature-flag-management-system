import "express";
import type { JwtPayloadType } from ".";

declare global {
  namespace Express {
    interface Request {
      jwtPayload: JwtPayloadType | undefined;
    }
  }
}
