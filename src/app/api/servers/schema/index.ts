import { z } from "zod";

export const requestInputSchema = z.object({
  name: z.string().nonempty(),
  imageUrl: z.string().nonempty(),
});
