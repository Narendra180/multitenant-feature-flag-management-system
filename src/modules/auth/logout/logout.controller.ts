import { RequestHandler } from "express";
import { logoutService } from "./logout.service";

const logoutController:RequestHandler = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  await logoutService(refreshToken);
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'lax', secure: true });
  res.sendStatus(204);
}

export {
  logoutController
}
