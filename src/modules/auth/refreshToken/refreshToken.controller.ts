import type { RequestHandler } from "express";
import { refreshTokenService } from "./refreshToken.service";

const refreshTokenController: RequestHandler = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refresh_token) {
    res.status(401).send({
      success: false,
      message: "Invalid Token.",
      data: null
    });
    return;
  };
  const refreshToken = cookies.refresh_token;
  const serviceResult = await refreshTokenService(refreshToken);
  const accessToken = serviceResult.accessToken;
  if (accessToken) {
    res.cookie(
      "access_token",
      serviceResult.accessToken,
      {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 1000 * 60 * 15
      }
    );
  }
  res.status(serviceResult.statusCode).send(serviceResult.data);
  return;
}

export {
  refreshTokenController
};

