"use client";
import { ContextType } from "../../util/Types";
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext<{
  cart: ContextType[];
  setCart: React.Dispatch<React.SetStateAction<ContextType[]>>;
}>({
  cart: [],
  setCart: () => [],
});

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<ContextType[]>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
