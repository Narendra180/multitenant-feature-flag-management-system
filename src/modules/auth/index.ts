import { Router } from "express";
import { isReqBodyValid } from "../../middleware/isReqBodyValid";
import { signUpReqBodyZodObj } from "./signup/signUp.schema";
import { signUpController } from "./signup/signUp.controller";
import { loginController } from "./logIn/login.controller";
import { loginReqBodyZodObj } from "./logIn/login.schema";
import { logoutController } from "./logout/logout.controller";
import { refreshTokenController } from "./refreshToken/refreshToken.controller";
import { verifyJwt } from "../../middleware/verifyJwt";
import { meController } from "./me/me.controller";

const authRouter = Router();

authRouter.post("/signup", isReqBodyValid(signUpReqBodyZodObj), signUpController);
authRouter.post("/login", isReqBodyValid(loginReqBodyZodObj), loginController);
authRouter.get("/refreshtoken", refreshTokenController);
authRouter.get("/logout", logoutController);

authRouter.get("/me", verifyJwt(), meController);

export {
  authRouter
}
