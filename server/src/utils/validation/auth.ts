import { z } from "zod";

export const authValid = z.object({
  username: z.string(),
  password: z.string(),
});

export type AuthDTO = z.infer<typeof authValid>;
