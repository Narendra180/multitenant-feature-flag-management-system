import { RequestHandler } from "express";
import * as z from "zod";

const isReqBodyValid = (zodObject: z.ZodObject) => {
  const reqHandler: RequestHandler = (req, res, next) => {
    const reqBody = req.body;
    if (!reqBody) {
      res.status(400).send({
        message: "Request Body is empty.",
        success: false,
        data: null
      });
      return;
    }
    try {
      const isValid = Boolean(zodObject.parse(reqBody));
      if (isValid) {
        next();
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const fields = err.issues.map((issue) => {
          return issue.path.join(",");
        });
        const message = `Invalid fields: ${fields.join(", ")}`;
        res.status(400).send({
          message,
          success: false,
          data: null
        });
        return;
      }
      res.status(400).send({
        message: "",
        success: false,
        data: null
      });
      return;
    }
  }
  return reqHandler;
}

export {
  isReqBodyValid
};
