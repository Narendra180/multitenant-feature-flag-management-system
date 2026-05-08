import { db } from "../../../config/drizzle/connection"
import { organizationsTable } from "../../../config/drizzle/schema";

const getAllOrganizationsService = async () => {
  try {
    const data = await db.select().from(organizationsTable);
    return data;
  } catch (err: any) {
    throw new Error("getAllOrganizationsService: Something went wrong, please try again later.")
  }
}

export {
  getAllOrganizationsService
}
