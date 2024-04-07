import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { z } from "zod";

import { cardOrderSchema } from "./schema";

export const PUT = async (request: NextRequest) => {
  const body = await request.json();

  const validation = cardOrderSchema.safeParse(body);

  if (!validation.success) {
    return Response.json(validation.error.format(), { status: 400 });
  }

  const items = validation.data;

  const transaction = items.map((item) =>
    db.card.update({
      where: {
        id: item.id,
      },
      data: {
        subjectId: item.subjectId,
        position: item.position,
      },
    }),
  );

  const newItems = db.$transaction(transaction);

  return Response.json(newItems);
};
