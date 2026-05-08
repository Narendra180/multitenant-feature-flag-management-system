import * as z from "zod";

const createOrgReqBodyZodObj = z.object({
  name: z.string(),
  address: z.string(),
  subdomainName: z.string()
});

type CreateOrgReqBodyType = z.infer<typeof createOrgReqBodyZodObj>;

export {
  createOrgReqBodyZodObj,
}

export type {
  CreateOrgReqBodyType
}
