import { RequestHandler } from "express";
import type { SignUpReqBodyType } from "./signUp.schema";
import { signUpService } from "./signUp.service";
import type { ResponseBody } from "../../../types";

const signUpController: RequestHandler = async (req, res) => {
  const reqBody = req.body as SignUpReqBodyType;

  const data = await signUpService(reqBody, req.headers["x-tenant-slug"] as string);

  if (data.success) {
    const respBody: ResponseBody = {
      message: "Signed up successfully.",
      success: true,
      data: data.createdUser,
    }
    res.status(201).send(respBody);
  } else {
    const respBody: ResponseBody = {
      message: "User with email already exists.",
      success: false,
      data: null,
    }
    res.status(409).send(respBody);
  }
}

export {
  signUpController
};

