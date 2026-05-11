import * as z from "zod";

const createFeatureFlagReqBodyZodObj = z.object({
  key: z.string(),
  isEnabled: z.boolean()
});

type CreateFeatureFlagReqBodyType = z.infer<typeof createFeatureFlagReqBodyZodObj>;

export {
  createFeatureFlagReqBodyZodObj,
}

export type {
  CreateFeatureFlagReqBodyType
}
