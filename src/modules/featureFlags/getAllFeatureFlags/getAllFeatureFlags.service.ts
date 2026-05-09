import { eq } from "drizzle-orm";
import { db } from "../../../config/drizzle/connection";
import { featureFlagsTable } from "../../../config/drizzle/schema";

const getAllFeatureFlagsService = async (organizationId: string, roles: string[]) => {
  const featureFlags = await db.select()
    .from(featureFlagsTable)
    .where(eq(featureFlagsTable.organizationId, organizationId));

  return {
    statusCode: 200,
    data: {
      success: true,
      message: "Fetched feature flags successfully",
      data: featureFlags
    }
  };
}

export {
  getAllFeatureFlagsService
}
