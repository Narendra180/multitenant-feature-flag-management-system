import { RequestHandler } from "express"
import { ResponseBody } from "../../../types";

const meController: RequestHandler = async (req, res) => {
  const jwtPayload = req.jwtPayload;
  if (jwtPayload) {
    const resBody: ResponseBody = {
      success: true,
      message: "Fetched user details successfully.",
      data: jwtPayload
    }
    res.status(200).send(resBody);
    return;
  } else {
    const resBody: ResponseBody = {
      success: false,
      message: "Failed to fetch user details.",
      data: "Invalid Token"
    }
    res.status(200).send(resBody);
    return;
  }
}

export {
  meController
}
