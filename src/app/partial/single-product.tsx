import Image from "next/image";
import type { Product } from "@/types/product";

export default async function SingleProduct() {
  const product: Product = await fetch(
    "http://localhost:3000/api/product",
  ).then((res) => res.json());

  return (
    <div>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <div className="space-y-2">
            <div className="relative aspect-square">
              <Image src={`/${product.image}`} alt="" sizes="50vw" fill />
            </div>
          </div>
        </div>

        <div className="col-span-2 text-sm text-white">
          {product.description}
        </div>

        <div className="col-span-1"></div>
      </div>
    </div>
  );
}
