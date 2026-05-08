import type { RequestHandler } from "express";
import { refreshTokenService } from "./refreshToken.service";

const refreshTokenController: RequestHandler = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.status(401).send({
      success: false,
      message: "Invalid refresh token.",
      data: null
    });
    return;
  };
  const refreshToken = cookies.jwt;
  const serviceResult = await refreshTokenService(refreshToken);
  res.status(serviceResult.statusCode).send(serviceResult.data);
  return;
}

export {
  refreshTokenController
};

