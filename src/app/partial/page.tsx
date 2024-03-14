import { Suspense } from "react";
import RecommendedProducts from "./recommended-products";
import SingleProduct from "./single-product";

export default function PartialRender() {
  return (
    <div className="bg-gray-950 bg-[url('/grid.svg')] text-sm text-white">
      <div className="mx-auto max-w-2xl p-8">
        <div className="rounded-lg border-1 border-slate-400 p-6">
          <SingleProduct />

          <Suspense fallback={<div>loading...</div>}>
            <RecommendedProducts />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
