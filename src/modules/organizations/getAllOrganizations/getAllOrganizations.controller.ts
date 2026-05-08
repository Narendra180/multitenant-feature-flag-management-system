import { RequestHandler } from "express"
import { getAllOrganizationsService } from "./getAllOrganizations.service";
import type { ResponseBody } from "../../../types";

const getAllOrganizationsController: RequestHandler = async (req, res, next) => {
  const data = await getAllOrganizationsService();
  const respBody: ResponseBody = {
    message: "Fetched organizations successfully.",
    success: true,
    data,
  }
  res.status(200).send(respBody);
  return;
}

export {
  getAllOrganizationsController
}
