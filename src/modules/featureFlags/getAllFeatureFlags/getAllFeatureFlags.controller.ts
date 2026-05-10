import { RequestHandler } from "express"
import { getAllFeatureFlagsService } from "./getAllFeatureFlags.service";
import { GetAllFeaturesQueryParamsType } from "./getAllFeatureFlags.schema";

const getAllFeatureFlagsController:RequestHandler = async (req, res) => {
  const {
    organizationId, roles
  } = req.jwtPayload!;
  const queryParams = req.query as GetAllFeaturesQueryParamsType;

  const serviceResponse = await getAllFeatureFlagsService(queryParams, organizationId, roles);
  return res.status(serviceResponse.statusCode).send(serviceResponse.data);
}

export {
  getAllFeatureFlagsController
}
