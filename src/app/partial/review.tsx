import { Review } from "@/types/review";
import { Avatar, Skeleton } from "@nextui-org/react";

export default async function Review() {
  const reviews: Review[] = await fetch(
    // We intentionally delay the response to simulate a slow data
    // request that would benefit from streaming
    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?delay=${4000}`,
    {
      // We intentionally disable Next.js Cache to better demo
      // streaming
      cache: "no-store",
    },
  ).then((res) => res.json());

  return (
    <div className="mt-6 space-y-8">
      <h2 className="text-lg font-medium text-white">
        Recommended Products for You
      </h2>

      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar size="sm" />
              <p className="text-sm text-white">{review.name}</p>
            </div>
            <div className="text-gray-400">{review.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkeletonItem() {
  return (
    <div className="flex w-full max-w-[300px] items-center gap-3">
      <div>
        <Skeleton className="flex h-12 w-12 rounded-full" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
    </div>
  );
}

export function ReviewSkeleton() {
  return (
    <div className="space-y-4">
      <SkeletonItem />
      <SkeletonItem />
    </div>
  );
}
