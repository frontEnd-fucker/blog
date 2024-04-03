import { z } from "zod";

export const updateSubjectSchema = z.array(
  z.object({
    id: z.number(),
    position: z.number(),
  }),
);
