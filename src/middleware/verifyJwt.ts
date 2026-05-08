import { inArray } from "drizzle-orm";
import { RequestHandler } from "express";
import { db } from "../config/drizzle/connection";
import { rolesTable } from "../config/drizzle/schema";
import { JwtPayloadType, ResponseBody } from "../types";
import { verifyJwtAsync } from "../utils/utils";

const verifyJwt = (roleToCheck?: string) => {
  const handler: RequestHandler = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).send({
        success: false,
        message: "Unauthorized",
        data: null
      } as ResponseBody)
      return;
    }

    const accessToken = authHeader.split(' ')[1];
    let decodedPayload = null;
    try {
      decodedPayload = await verifyJwtAsync(
        accessToken,
        process.env.ACCESS_TOKEN_JWT_PUBLIC_KEY!,
        {
          algorithms: ["ES512"]
        }
      ) as JwtPayloadType;
    } catch (err: any) {
      res.status(401).send({
        success: false,
        message: "Unauthorized",
        data: null
      } as ResponseBody);
      return;
    }

    if (roleToCheck && decodedPayload) {
      const roles = await db.select({ roleName: rolesTable.role })
        .from(rolesTable)
        .where(inArray(rolesTable.id, decodedPayload.roles))
      const foundRole = roles.find(obj => obj.roleName === roleToCheck);
      if (foundRole) {
        next();
      } else {
        res.status(403).send({
          success: false,
          message: "Forbidden",
          data: null
        } as ResponseBody)
        return;
      }
    } else {
      next();
    }
  }
  return handler;
}

export {
  verifyJwt
};

