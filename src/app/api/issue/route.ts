import { db } from "@/lib/db";
import { issueSchema } from "./schema";

export async function POST(request: Request) {
  const body = await request.json();

  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return Response.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await db.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return Response.json(newIssue);
}
