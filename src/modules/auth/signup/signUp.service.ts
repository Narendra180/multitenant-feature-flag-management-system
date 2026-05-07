import { and, eq } from "drizzle-orm";
import { db } from "../../../config/drizzle/connection";
import { organizationsTable, rolesTable, userRoleMapTable, usersTable } from "../../../config/drizzle/schema";
import type { SignUpReqBodyType } from "./signUp.schema";
import argon2 from "argon2";

const signUpService = async (reqBody: SignUpReqBodyType, orgSubdomain: string) => {
  try {
    const {
      email, password
    } = reqBody;

    const [userWithEmailAlreadyExists] = await db.select({ email: usersTable.email })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (userWithEmailAlreadyExists) {
      return {
        success: false
      }
    }

    const pepper = Buffer.from(process.env.ARGON2_PEPPER!, 'hex');
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
      secret: pepper
    });

    const createdUser = await db.transaction(async (tx) => {
      const [createdUser] = await tx.insert(usersTable).values({
        email,
        password: hash,
      }).returning({
        userId: usersTable.id,
        email: usersTable.email
      });

      const [organizationObj] = await db.select({
        orgId: organizationsTable.id
      }).from(organizationsTable)
        .where(eq(organizationsTable.subdomainName, orgSubdomain));

      const [roleObj] = await db.select({
        roleId: rolesTable.id
      }).from(rolesTable)
        .where(
          and(
            eq(rolesTable.role, "user"),
            eq(rolesTable.organizationId, organizationObj.orgId)
          )
        );
      
      if(organizationObj && roleObj) {
        await tx.insert(userRoleMapTable)
        .values({
          roleId: roleObj.roleId,
          organizationId: organizationObj.orgId,
          userId: createdUser.userId
        })
      }
    });

    return {
      success: true,
      createdUser,
    };
  } catch (error: any) {
    console.log({ error })
    throw new Error("Something went wrong, please try again later.");
  }
}

export {
  signUpService
}
