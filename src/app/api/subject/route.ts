import { db } from "@/lib/db";

import { subjectSchema, updateSubjectSchema } from "./schema";

export async function POST(request: Request) {
  const body = await request.json();

  const validation = subjectSchema.safeParse(body);

  if (!validation.success) {
    return Response.json(validation.error.format(), { status: 400 });
  }

  const { title, boardId } = validation.data;

  const lastSubject = await db.subject.findFirst({
    where: { boardId },
    orderBy: { position: "desc" },
    select: { position: true },
  });

  const newPosition = lastSubject ? lastSubject.position + 1 : 1;

  const newSubject = await db.subject.create({
    data: {
      title,
      boardId,
      position: newPosition,
    },
  });

  return Response.json(newSubject);
}

export async function PUT(request: Request) {
  const body = await request.json();

  const validation = updateSubjectSchema.safeParse(body);

  if (!validation.success) {
    return Response.json(validation.error.format(), { status: 400 });
  }

  const { title, boardId, id } = validation.data;

  const newSubject = await db.subject.update({
    where: {
      id,
      boardId,
    },
    data: {
      title,
    },
  });

  return Response.json(newSubject);
}
