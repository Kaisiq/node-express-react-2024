import { type ReactNode, createContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface CartContextType {
  cartProducts: string[];
  setCartProducts: Dispatch<SetStateAction<string[]>>;
  addProduct: (productID: string) => void;
  removeProduct: (productID: string) => void;
}

export const CartContext = createContext<CartContextType>({
  cartProducts: [],
  setCartProducts: () => {}, // eslint-disable-line
  addProduct: () => {}, // eslint-disable-line
  removeProduct: () => {}, // eslint-disable-line
});

export function CartContextProvider({ children }: { children: ReactNode }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState<string[]>([]);
  useEffect(() => {
    if (cartProducts.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  function addProduct(productID: string) {
    setCartProducts((prev) => {
      if (!prev.includes(productID)) {
        return [...prev, productID];
      } else {
        return prev;
      }
    });
  }

  function removeProduct(productID: string) {
    setCartProducts((prev) => prev.filter((el) => el != productID));
  }

  useEffect(() => {
    if (ls?.getItem("cart")) {
      const cartData = JSON.parse(ls.getItem("cart")!) as string[];
      if (Array.isArray(cartData)) {
        setCartProducts(cartData);
      }
    }
  }, [ls]);
  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProduct, removeProduct }}
    >
      {children}
    </CartContext.Provider>
  );
}
