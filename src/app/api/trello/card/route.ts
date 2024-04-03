import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

import { cardSchema } from "./schema";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = cardSchema.safeParse(body);

  if (!validation.success) {
    return Response.json(validation.error.format(), { status: 400 });
  }

  const { title, subjectId } = validation.data;

  const lastCard = await db.card.findFirst({
    where: { subjectId },
    orderBy: { position: "desc" },
    select: { position: true },
  });

  const newPosition = lastCard ? lastCard.position + 1 : 1;

  const newCard = await db.card.create({
    data: {
      title,
      subjectId,
      position: newPosition,
    },
  });

  revalidatePath(`/trello/${subjectId}`);

  return Response.json(newCard);
}
