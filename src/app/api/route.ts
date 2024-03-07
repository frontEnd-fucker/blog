import { db } from "@/lib/db";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  const allUsers = await db.user.findMany();
  return Response.json({ allUsers });
}

export async function POST() {
  await db.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: { title: "Hello World" },
      },
      profile: {
        create: { bio: "I like turtles" },
      },
    },
  });
  return new Response("OK");
}

export async function PUT() {
  const post = await db.post.update({
    where: { id: 1 },
    data: { published: true },
  });

  return Response.json(post);
}
