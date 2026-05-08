
import * as z from "zod";

const loginReqBodyZodObj = z.object({
  email: z.string(),
  password: z.string()
});

type loginReqBodyType = z.infer<typeof loginReqBodyZodObj>;

export {
  loginReqBodyZodObj,
}

export type {
  loginReqBodyType
}
