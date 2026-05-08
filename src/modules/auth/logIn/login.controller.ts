import { RequestHandler } from "express";
import type { loginReqBodyType } from "./login.schema";
import { loginService } from "./login.service";
import { ResponseBody } from "../../../types";

const loginController: RequestHandler = async (req, res) => {
  const reqBody = req.body as loginReqBodyType;

  const data = await loginService(reqBody, req.headers["x-tenant-slug"] as string);
  if (!data.success) {
    const respBody: ResponseBody = {
      message: "Invalid email or password.",
      success: false,
      data: null,
    }
    res.status(400).send(respBody);
    return;
  } else if (data.success) {
    const accessToken = data.accessToken!;
    const refreshToken = data.refreshToken!;

    res.cookie(
      "jwt",
      refreshToken,
      {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
      }
    )

    const respBody: ResponseBody = {
      message: "Logged in sucessfully.",
      success: true,
      data: {
        accessToken
      },
    }
    res.status(200).send(respBody);
    return;
  }

}

export {
  loginController
}
