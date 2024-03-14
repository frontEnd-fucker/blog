import { Product } from "@/types/product";
import { headers } from "next/headers";

export default async function RecommendedProducts() {
  headers();

  const products: Product[] = await fetch(
    "http://localhost:3000/api/recommend",
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
            <div key={product.id} className="col-span-1">
              <p>{product.name}</p>
              <p>{product.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
