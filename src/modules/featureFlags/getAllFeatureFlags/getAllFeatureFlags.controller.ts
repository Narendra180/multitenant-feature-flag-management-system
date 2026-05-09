import { RequestHandler } from "express"
import { getAllFeatureFlagsService } from "./getAllFeatureFlags.service"

const getAllFeatureFlagsController:RequestHandler = async (req, res) => {
  const {
    organizationId, roles
  } = req.jwtPayload!;
  const serviceResponse = await getAllFeatureFlagsService(organizationId, roles);
  return res.status(serviceResponse.statusCode).send(serviceResponse.data);
}

export {
  getAllFeatureFlagsController
}
