import { and, eq } from "drizzle-orm";
import { db } from "../../../config/drizzle/connection";
import { featureFlagsTable } from "../../../config/drizzle/schema";
import { GetAllFeaturesQueryParamsType } from "./getAllFeatureFlags.schema";

const getAllFeatureFlagsService = async (reqParams: GetAllFeaturesQueryParamsType | undefined, organizationId: string, roles: string[]) => {
  try {
    let whereCondition;
    if (reqParams?.name) {
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
    console.log({ organizationId })
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
  } catch (err: any) {
    throw new Error("getAllFeatureFlagsService: Something went wrong, please try again later.");
  }
}

export {
  getAllFeatureFlagsService
}
