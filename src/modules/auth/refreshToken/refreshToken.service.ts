import { eq } from "drizzle-orm";
import { db } from "../../../config/drizzle/connection"
import { usersTable } from "../../../config/drizzle/schema";
import { signJwtAsync, verifyJwtAsync } from "../../../utils/utils";
import type { JwtPayloadType, ResponseBody } from "../../../types";

const refreshTokenService = async (refreshToken: string) => {
  try {
    const [userWithRefreshToken] = await db.select()
      .from(usersTable)
      .where(eq(usersTable.refreshToken, refreshToken));

    const invalidRespBody: ResponseBody = {
      success: false,
      message: "Invalid refresh token.",
      data: null
    }
    if (!userWithRefreshToken) {
      return {
        statusCode: 403,
        data: invalidRespBody
      }
    }
    try {
      const decodedPayload = await verifyJwtAsync(
        refreshToken,
        process.env.REFRESH_TOKEN_JWT_PUBLIC_KEY!,
        {
          algorithms: ["ES512"]
        }
      ) as JwtPayloadType;

      const accessToken = await signJwtAsync(
        {
          userId: decodedPayload.userId,
          roles: decodedPayload.roles,
          organizationSubdomain: decodedPayload.organizationSubdomain,
          organizationId: decodedPayload.organizationId
        },
        process.env.ACCESS_TOKEN_JWT_PRIVATE_KEY!,
        {
          algorithm: "ES512",
          expiresIn: "15m"
        }
      );

      const respBody: ResponseBody = {
        success: true,
        message: "Refreshed token successfully.",
        data: null
      }
      return {
        statusCode: 200,
        data: respBody
      }
    } catch (err) {
      console.log(err)
      return {
        statusCode: 403,
        data: invalidRespBody
      }
    }

  } catch (err: any) {
    throw new Error("refreshTokenService: Something went wrong, please try again later.")
  }
}

export {
  refreshTokenService
}