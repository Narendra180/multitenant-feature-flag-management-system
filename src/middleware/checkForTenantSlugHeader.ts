import { RequestHandler } from "express"

const checkForTenantSlugHeader: RequestHandler = (req, res, next) => {
  if (!req.headers["x-tenant-slug"]) {
    res.status(400).send({
      message: "x-tenant-slug header is required.",
      success: true,
      data: null,
    });
    return;
  };
  next();
}

export {
  checkForTenantSlugHeader
}
