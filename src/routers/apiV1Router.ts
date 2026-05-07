import { Router } from "express";
import { authRouter } from "../modules/auth/signup";

const apiV1Router = Router();

apiV1Router.use("/auth", authRouter);

export {
  apiV1Router
}
