import { RequestHandler } from "express";
import type { updateFeatureFlagReqBodyType } from "./updateFeatureFlag.schema";
import { updateFeatureFlagservice } from "./updateFeatureFlag.service";

const updateFeatureFlagController:RequestHandler = async (req, res) => {
  const reqBody = req.body as updateFeatureFlagReqBodyType;
  const reqParams = req.params;
  const orgId = req.jwtPayload!.organizationId;

  const serviceResult = await updateFeatureFlagservice(reqBody, reqParams.flagid as string, orgId);
  res.status(serviceResult.statusCode).send(serviceResult.data);
  return;
}

export {
  updateFeatureFlagController
};

