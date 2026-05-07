
import * as z from "zod";

const signUpReqBodyZodObj = z.object({
  email: z.string(),
  password: z.string()
});

type SignUpReqBodyType = z.infer<typeof signUpReqBodyZodObj>;

export {
  signUpReqBodyZodObj,
}

export type {
  SignUpReqBodyType
}
