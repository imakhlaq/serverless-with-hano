import { z } from "zod";

export const blogValid = z.object({
  tittle: z.string(),
  content: z.string(),
  user_id: z.string(),
});

export type blogDTO = z.infer<typeof blogValid>;
