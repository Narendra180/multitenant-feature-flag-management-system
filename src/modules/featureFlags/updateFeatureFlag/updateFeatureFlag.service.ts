import { eq } from "drizzle-orm";
import { db } from "../../../config/drizzle/connection";
import { featureFlagsTable } from "../../../config/drizzle/schema";
import { updateFeatureFlagReqBodyType } from "./updateFeatureFlag.schema"
import { and } from "drizzle-orm";

const updateFeatureFlagservice = async (
  reqBody: updateFeatureFlagReqBodyType,
  flagId: string,
  organizationId: string
) => {
  try {
    const {
      enabled
    } = reqBody;

    const [doesFeatureFlagExist] = await db.select().from(featureFlagsTable).where(eq(featureFlagsTable.id, flagId));
    if (!doesFeatureFlagExist) {
      return {
        statusCode: 400,
        data: {
          success: false,
          data: null,
          message: "Feature flag not found."
        }
      }
    }

    const [updatedFeatureFlag] = await db.update(featureFlagsTable).set({
      isEnabled: enabled
    }).where(
      and(
        eq(featureFlagsTable.id, flagId),
        eq(featureFlagsTable.organizationId, organizationId)
      )
    ).returning();

    return {
      statusCode: 200,
      data: {
        success: true,
        data: updatedFeatureFlag,
        message: "Updated feature flag successfully."
      }
    }

  } catch (err: any) {
    throw new Error("updateFeatureFlagservice: Something went wrong, please try again later.");
  }
}

export {
  updateFeatureFlagservice
}
