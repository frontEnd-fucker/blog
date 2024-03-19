import { Product } from "@/types/product";
import { Card, Skeleton } from "@nextui-org/react";
import { headers } from "next/headers";
import Image from "next/image";

export default async function RecommendedProducts() {
  headers();

  const products: Product[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
    {
      // We intentionally disable Next.js Cache to better demo
      // streaming
      cache: "no-store",
    },
  ).then((res) => res.json());

  return (
    <div className="mt-6 space-y-6">
      <div>
        <h2 className="text-lg font-medium text-white">
          Recommended Products for You
        </h2>
        <p className="text-sm text-gray-400">
          Based on your preferences and shopping habits
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => {
          return (
            <div key={product.id} className="col-span-1 space-y-2">
              <div className="relative aspect-square">
                <Image
                  className="rounded-xl"
                  src={`/${product.image}`}
                  sizes="50vw"
                  alt={product.name}
                  fill
                />
              </div>
              <p>{product.name}</p>
              <p>{product.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SkeletonItem() {
  return (
    <Card className="space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}

export function RecommendedProductsSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </div>
  );
}
