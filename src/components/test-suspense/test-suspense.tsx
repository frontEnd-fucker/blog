import { db } from "@/lib/db";

export const TestSuspense = async () => {
  const post = await db.post.findFirst();

  if (!post) return <div>no post</div>;

  return (
    <div>
      <p>{post.title}</p>
      <p>{post.content}</p>
    </div>
  );
};

export default TestSuspense;
