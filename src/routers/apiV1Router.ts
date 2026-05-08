import { Router } from "express";
import { authRouter } from "../modules/auth";
import { organizationRouter } from "../modules/organizations";

const apiV1Router = Router();

apiV1Router.use("/auth", authRouter);
apiV1Router.use("/organizations", organizationRouter);

export {
  apiV1Router
}
