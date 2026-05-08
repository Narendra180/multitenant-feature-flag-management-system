import { RequestHandler } from "express";
import type { CreateOrgReqBodyType } from "./createOrganization.schema";
import { createOrganizationService } from "./createOrganization.service";

const createOrganizationController:RequestHandler = async (req, res) => {
  const reqBody = req.body as CreateOrgReqBodyType;
  const serviceResult = await createOrganizationService(reqBody);
  res.status(serviceResult.statusCode).send(serviceResult.data);
  return;
}

export {
  createOrganizationController
};

