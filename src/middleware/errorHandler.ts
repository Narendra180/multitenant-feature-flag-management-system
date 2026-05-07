import { ErrorRequestHandler } from "express"
import { ResponseBody } from "../types"

const errorHandlerMiddleware:ErrorRequestHandler = (err, req, res, next) => {
  const resBody: ResponseBody = {
    data: null,
    message: err.message,
    success: false
  };
  res.status(500).send(resBody);
}

export {
  errorHandlerMiddleware
}
