import { RequestHandler } from "express"
import { deleteFeatureFlagService } from "./deleteFeatureFlag.service";

const deleteFeatureFlagController: RequestHandler = async (req, res) => {
  const reqParams = req.params;
  const orgId = req.jwtPayload!.organizationId;
  const serviceResponse = await deleteFeatureFlagService(reqParams.flagid as string, orgId);
  res.status(serviceResponse.statusCode).send(serviceResponse.data);
}

export {
  deleteFeatureFlagController
}
