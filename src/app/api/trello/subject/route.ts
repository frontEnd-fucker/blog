import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

import { updateSubjectSchema } from "./schema";

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const validation = updateSubjectSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const items = validation.data;

  const transaction = items.map((subject) =>
    db.subject.update({
      where: { id: subject.id },
      data: { position: subject.position },
    }),
  );

  const newItems = db.$transaction(transaction);

  return NextResponse.json(newItems);
}
