import { inArray } from "drizzle-orm";
import { RequestHandler } from "express";
import { db } from "../config/drizzle/connection";
import { rolesTable } from "../config/drizzle/schema";
import { JwtPayloadType, ResponseBody } from "../types";
import { verifyJwtAsync } from "../utils/utils";

// The user should have atleast one of the rolesToCheck role.
const verifyJwt = (rolesToCheck?: string[]) => {
  const handler: RequestHandler = async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.access_token) {
      res.status(401).send({
        success: false,
        message: "Unauthorized",
        data: "Invalid Token"
      } as ResponseBody)
      return;
    }

    const accessToken = cookies.access_token;
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
        data: "Invalid Token"
      } as ResponseBody);
      return;
    }

    const roles = await db.select({ roleName: rolesTable.role })
      .from(rolesTable)
      .where(inArray(rolesTable.id, decodedPayload.roles));
    const userRolesStrArr = roles.map(roleObj => roleObj.roleName);
    req.jwtPayload = {
      ...decodedPayload,
      roles: userRolesStrArr
    };

    if (rolesToCheck?.length && decodedPayload) {
      let foundRole = false;
      for (let i = 0; i < rolesToCheck.length; i++) {
        if (userRolesStrArr.includes(rolesToCheck[i])) {
          foundRole = true;
          break;
        }
      }
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

