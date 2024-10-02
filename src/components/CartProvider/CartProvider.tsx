"use client";

import { ItemType } from "@/util/Types";
import React, { createContext, useContext } from "react";

const CartContext = createContext<ItemType[]>([]);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartContext.Provider value={[]}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
