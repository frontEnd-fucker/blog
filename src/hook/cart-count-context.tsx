import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type CartCountContextType =
  | [number | undefined, Dispatch<SetStateAction<number | undefined>>]
  | null;

const CartCountContext = createContext<CartCountContextType>(null);

export const CartCountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [count, setCount] = useState<number>();

  return (
    <CartCountContext.Provider value={[count, setCount]}>
      {children}
    </CartCountContext.Provider>
  );
};

export const useCartCountContext = (
  initialCount?: number,
): Exclude<CartCountContextType, null> => {
  const context = useContext(CartCountContext);

  if (!context) {
    throw new Error(
      "useCartCountContext must be used within CartCountProvider",
    );
  }

  if (context[0] === undefined) {
    return [initialCount, context[1]];
  }

  return context;
};
