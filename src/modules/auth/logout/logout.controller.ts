import { RequestHandler } from "express";
import { logoutService } from "./logout.service";

const logoutController:RequestHandler = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refresh_token) return res.sendStatus(204);
  const refreshToken = cookies.refresh_token;
  await logoutService(refreshToken);
  res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'lax', secure: true });
  res.clearCookie('access_token', { httpOnly: true, sameSite: 'lax', secure: true });
  res.sendStatus(204);
}

export {
  logoutController
}
