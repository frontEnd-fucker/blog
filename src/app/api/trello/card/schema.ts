import { z } from "zod";

export const cardSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  subjectId: z.number(),
});
