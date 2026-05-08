import { eq } from "drizzle-orm";
import { db } from "../../../config/drizzle/connection";
import { organizationsTable } from "../../../config/drizzle/schema";
import { CreateOrgReqBodyType } from "./createOrganization.schema";

const createOrganizationService = async (reqBody: CreateOrgReqBodyType) => {
  try {
    const {
      name, address, subdomainName
    } = reqBody;

    const [isOrgSubdomainExist] = await db.select().from(organizationsTable).where(eq(organizationsTable.subdomainName, subdomainName));
    if (isOrgSubdomainExist) {
      return {
        statusCode: 409,
        data: {
          success: false,
          message: "Organization with subdomain already exists.",
          data: null
        }
      }
    }
    const [createdOrg] = await db.insert(organizationsTable).values({
      name, address, subdomainName
    }).returning();
    return {
      statusCode: 201,
      data: {
        success: true,
        data: createdOrg,
        message: "Created organization successfully."
      }
    };
  } catch (err: any) {
    console.log(err)
    throw new Error("createOrganizationService: Something went wrong, please try again later.")
  }
}

export {
  createOrganizationService
}
