"use client";

import {
  CartCountProvider,
  useCartCountContext,
} from "@/hook/cart-count-context";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function AddToCart() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [count, setCount] = useCartCountContext(0);

  const addToCart = () => {
    startTransition(() => {
      const _count = count === undefined ? 0 : count + 1;
      setCount(_count);
      router.refresh();
    });
  };

  return (
    <div>
      <p>Cart Num: {count}</p>
      <Button
        size="sm"
        color="primary"
        onClick={addToCart}
        isLoading={isPending}
      >
        Add To Cart
      </Button>
    </div>
  );
}
