import argon2 from "argon2";
import { and, eq } from "drizzle-orm";
import { db } from "../../../config/drizzle/connection";
import { organizationsTable, userRoleMapTable, usersTable } from "../../../config/drizzle/schema";
import { signJwtAsync } from "../../../utils/utils";
import type { loginReqBodyType } from "./login.schema";

const loginService = async (reqBody: loginReqBodyType, orgSubdomain: string) => {
  try {
    const {
      email, password
    } = reqBody;

    const [organization] = await db.select({ orgId: organizationsTable.id }).from(organizationsTable).where(eq(organizationsTable.subdomainName, orgSubdomain));
    const [userObj] = await db.select({
      userId: usersTable.id,
      email: usersTable.email,
      passwordHash: usersTable.password,
      orgId: userRoleMapTable.organizationId,
    }).from(usersTable)
      .where(
        and(
          eq(usersTable.email, email)
        )
      )
      .leftJoin(userRoleMapTable, and(eq(userRoleMapTable.userId, usersTable.id), eq(userRoleMapTable.organizationId, organization.orgId)))

    if (!userObj) {
      return {
        success: false,
        data: null
      }
    }

    const pepper = Buffer.from(process.env.ARGON2_PEPPER!, 'hex');
    const isPasswordValid = await argon2.verify(userObj.passwordHash, password, {
      secret: pepper
    });

    if (!isPasswordValid) {
      return {
        success: false,
        data: "Invalid password"
      }
    }

    const roles = await db.select({
      roleId: userRoleMapTable.roleId
    })
      .from(userRoleMapTable)
      .where(
        and(
          eq(userRoleMapTable.userId, userObj.userId),
          eq(userRoleMapTable.organizationId, organization.orgId)
        )
      );

    const roleIds = roles.map(obj => obj.roleId);

    const accessToken = await signJwtAsync(
      {
        userId: userObj.userId,
        roles: roleIds,
        organizationSubdomain: orgSubdomain,
        organizationId: organization.orgId
      },
      process.env.ACCESS_TOKEN_JWT_PRIVATE_KEY!,
      {
        algorithm: "ES512",
        expiresIn: "15m"
      }
    );

    const refreshToken = await signJwtAsync(
      {
        userId: userObj.userId,
        roles: roleIds,
        organizationSubdomain: orgSubdomain,
        organizationId: organization.orgId
      },
      process.env.REFRESH_TOKEN_JWT_PRIVATE_KEY!,
      {
        algorithm: "ES512",
        expiresIn: "7d"
      }
    );

    await db.update(usersTable).set({
      refreshToken
    }).where(eq(usersTable.id, userObj.userId));

    return {
      success: true,
      accessToken,
      refreshToken
    }

  } catch (error: any) {
    throw new Error("loginService: Something went wrong, please try again later.");
  }
}

export {
  loginService
};

