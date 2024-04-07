import { z } from "zod";

export const subjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  boardId: z.number(),
});

export const updateSubjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  boardId: z.number(),
  id: z.number(),
});
