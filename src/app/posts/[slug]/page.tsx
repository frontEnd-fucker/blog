// app/posts/[slug]/page.tsx
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import MDXContent from "@/components/mdx/mdx-content";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  // Find the post for the current page.
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  // 404 if the post does not exist.
  if (!post) notFound();

  return (
    <div className="prose container mx-auto py-10 w-full max-w-4xl">
      {/* Some code ... */}
      <MDXContent code={post.body.code} />
    </div>
  );
}
