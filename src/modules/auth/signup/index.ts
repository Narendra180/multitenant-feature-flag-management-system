import { Router } from "express";
import { isReqBodyValid } from "../../../middleware/isReqBodyValid";
import { signUpReqBodyZodObj } from "./signUp.schema";
import { signUpController } from "./signUp.controller";

const authRouter = Router();

authRouter.post("/signup", isReqBodyValid(signUpReqBodyZodObj), signUpController);

export {
  authRouter
}
