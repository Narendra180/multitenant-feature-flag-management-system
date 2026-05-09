import { RequestHandler } from "express";
import type { CreateFeatureFlagReqBodyType } from "./createFeatureFlag.schema";
import { createFeatureFlagService } from "./createFeatureFlag.service";

const createFeatureFlagController:RequestHandler = async (req, res) => {
  const reqBody = req.body as CreateFeatureFlagReqBodyType;
  const serviceResult = await createFeatureFlagService(reqBody, req.jwtPayload!.organizationId);
  res.status(serviceResult.statusCode).send(serviceResult.data);
  return;
}

export {
  createFeatureFlagController
};
