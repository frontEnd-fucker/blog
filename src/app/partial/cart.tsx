"use client";

import { Badge } from "@nextui-org/react";
import { BuildingStorefrontIcon } from "@heroicons/react/16/solid";
import { useCartCountContext } from "@/hook/cart-count-context";

export default function Cart() {
  const [count] = useCartCountContext();

  return (
    <div>
      <Badge content={count || 0} color="secondary">
        <div className="rounded-full bg-gray-600 p-2">
          <BuildingStorefrontIcon className="h-6 w-6 text-white" />
        </div>
      </Badge>
    </div>
  );
}
