import { Router } from "express";
import { authRouter } from "../modules/auth";
import { organizationRouter } from "../modules/organizations";
import { featureFlagsRouter } from "../modules/featureFlags";

const apiV1Router = Router();

apiV1Router.use("/auth", authRouter);
apiV1Router.use("/organizations", organizationRouter);
apiV1Router.use("/featureflags", featureFlagsRouter);

export {
  apiV1Router
}
