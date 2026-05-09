import * as z from "zod";

const updateFeatureFlagReqBodyZodObj = z.object({
  enabled: z.boolean()
});

type updateFeatureFlagReqBodyType = z.infer<typeof updateFeatureFlagReqBodyZodObj>;

export {
  updateFeatureFlagReqBodyZodObj,
}

export type {
  updateFeatureFlagReqBodyType
}
