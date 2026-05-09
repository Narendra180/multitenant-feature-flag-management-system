import { Router } from "express";
import { verifyJwt } from "../../middleware/verifyJwt";
import { getAllOrganizationsController } from "./getAllOrganizations/getAllOrganizations.controller";
import { createOrganizationController } from "./createOrganization/createOrganization.controller";
import { isReqBodyValid } from "../../middleware/isReqBodyValid";
import { createOrgReqBodyZodObj } from "./createOrganization/createOrganization.schema";

const organizationRouter = Router();

organizationRouter.get("/", verifyJwt(["superadmin"]), getAllOrganizationsController);
organizationRouter.post("/", verifyJwt(["superadmin"]), isReqBodyValid(createOrgReqBodyZodObj), createOrganizationController)

export {
  organizationRouter
};

