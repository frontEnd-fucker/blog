import { Suspense } from "react";
import RecommendedProducts, {
  RecommendedProductsSkeleton,
} from "./recommended-products";
import SingleProduct from "./single-product";
import Review, { ReviewSkeleton } from "./review";
import Header from "./header";
import { CartCountProvider } from "@/hook/cart-count-context";

export default function PartialRender() {
  return (
    <CartCountProvider>
      <div className="bg-gray-950 bg-[url('/grid.svg')] text-sm text-white">
        <div className="mx-auto max-w-2xl p-8">
          <div className="space-y-8 rounded-lg border-1 border-slate-400 p-6">
            <Header />

            <SingleProduct />

            <Suspense fallback={<RecommendedProductsSkeleton />}>
              <RecommendedProducts />
            </Suspense>

            <Suspense fallback={<ReviewSkeleton />}>
              <Review />
            </Suspense>
          </div>
        </div>
      </div>
    </CartCountProvider>
  );
}
