import { z } from "zod";

export const cardOrderSchema = z.array(
  z.object({
    id: z.string(),
    position: z.number(),
    subjectId: z.number(),
  }),
);
