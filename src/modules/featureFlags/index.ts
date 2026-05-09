import { Router } from "express";
import { verifyJwt } from "../../middleware/verifyJwt";
import { getAllFeatureFlagsController } from "./getAllFeatureFlags/getAllFeatureFlags.controller";
import { createFeatureFlagController } from "./createFeatureFlag/createFeatureFlag.controller";
import { isReqBodyValid } from "../../middleware/isReqBodyValid";
import { createFeatureFlagReqBodyZodObj } from "./createFeatureFlag/createFeatureFlag.schema";
import { updateFeatureFlagController } from "./updateFeatureFlag/updateFeatureFlag.controller";
import { updateFeatureFlagReqBodyZodObj } from "./updateFeatureFlag/updateFeatureFlag.schema";
import { deleteFeatureFlagController } from "./deleteFeatureFlag/deleteFeatureFlag.controller";

const featureFlagsRouter = Router();

featureFlagsRouter.get("/", verifyJwt(), getAllFeatureFlagsController);
featureFlagsRouter.post("/", verifyJwt(["superadmin"]), isReqBodyValid(createFeatureFlagReqBodyZodObj), createFeatureFlagController);
featureFlagsRouter.patch("/:flagid", verifyJwt(["superadmin"]), isReqBodyValid(updateFeatureFlagReqBodyZodObj), updateFeatureFlagController);
featureFlagsRouter.delete("/:flagid", verifyJwt(["superadmin"]), deleteFeatureFlagController);

export {
  featureFlagsRouter
}
