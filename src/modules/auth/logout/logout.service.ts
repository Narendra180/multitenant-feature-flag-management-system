import { eq } from "drizzle-orm";
import { db } from "../../../config/drizzle/connection";
import { usersTable } from "../../../config/drizzle/schema";

const logoutService = async (refreshToken: string) => {
  try {
    const [userWithRefreshToken] = await db.select().from(usersTable).where(eq(usersTable.refreshToken, refreshToken));
    if(userWithRefreshToken) {
      await db.update(usersTable).set({
        refreshToken: ""
      }).where(eq(usersTable.id, userWithRefreshToken.id));
    }
    return;
  } catch (err: any) {
    throw new Error("getAllOrganizationsService: Something went wrong, please try again later.")
  }
}

export {
  logoutService
}
