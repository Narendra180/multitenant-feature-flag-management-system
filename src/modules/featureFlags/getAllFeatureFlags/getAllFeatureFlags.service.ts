import { and, eq } from "drizzle-orm";
import { db } from "../../../config/drizzle/connection";
import { featureFlagsTable } from "../../../config/drizzle/schema";
import { GetAllFeaturesQueryParamsType } from "./getAllFeatureFlags.schema";

const getAllFeatureFlagsService = async (reqParams: GetAllFeaturesQueryParamsType | undefined, organizationId: string, roles: string[]) => {

  let whereCondition;
  if(reqParams) {
    const {
      name
    } = reqParams;
    whereCondition = and(
      eq(featureFlagsTable.key, name),
      eq(featureFlagsTable.organizationId, organizationId)
    );
  } else {
    whereCondition = eq(featureFlagsTable.organizationId, organizationId);
  }
  const featureFlags = await db.select()
    .from(featureFlagsTable)
    .where(whereCondition);
  
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
