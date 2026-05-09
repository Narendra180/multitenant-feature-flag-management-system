import { and, eq } from "drizzle-orm";
import { db } from "../../../config/drizzle/connection";
import { featureFlagsTable } from "../../../config/drizzle/schema";

const deleteFeatureFlagService = async (flagId: string, organizationId: string) => {
  try {
    const [deletedFeatureFlag] = await db.delete(featureFlagsTable)
      .where(
        and(
          eq(featureFlagsTable.id, flagId),
          eq(featureFlagsTable.organizationId, organizationId)
        )
      ).returning();
    return {
      statusCode: 200,
      data: {
        success: true,
        message: "Deleted feature flag successfully.",
        data: deletedFeatureFlag || null
      }
    }
  } catch (err: any) {
    throw new Error("deleteFeatureFlagService: Something went wrong, please try again later.");
  }
}

export {
  deleteFeatureFlagService
}
