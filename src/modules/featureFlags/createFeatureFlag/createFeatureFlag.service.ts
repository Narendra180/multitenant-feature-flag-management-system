import { db } from "../../../config/drizzle/connection";
import { featureFlagsTable } from "../../../config/drizzle/schema";
import type { CreateFeatureFlagReqBodyType } from "./createFeatureFlag.schema"

const createFeatureFlagService = async (reqBody: CreateFeatureFlagReqBodyType, organizationId: string) => {
  try {
    const {
      key, isEnabled
    } = reqBody;

    const [createdFeatureFlag] = await db.insert(featureFlagsTable).values({
      key,
      isEnabled,
      organizationId
    }).returning();

    return {
      statusCode: 200,
      data: {
        success: true,
        message: "Created feature flag successfully.",
        data: createdFeatureFlag
      }
    }
  } catch (err: any) {
    if (err.cause.code === "23505") {
      return {
        statusCode: 400,
        data: {
          success: false,
          message: "Feature flag already exists.",
          data: null
        }
      }
    } else {
      throw new Error("createFeatureFlagService: Something went wrong, please try again later.");
    }
  }
}

export {
  createFeatureFlagService
}