"use client";
import React from "react";
import { ItemType } from "@/util/Types"; // Import your ItemType
import { useCart } from "@/components/CartProvider/CartProvider"; // Import useCart hook
import { addItemToCart } from "@/util/cartActions"; // Import the addItemToCart function

type Props = {
  item: ItemType; // The entire item object is passed as a prop
};

function AddToCart({ item }: Props) {
  const { cart, setCart } = useCart();

  const handleAddToCart = () => {
    addItemToCart(cart, setCart, item);
  };

  return <button onClick={handleAddToCart}>Add {item.name} to cart +</button>;
}

export default AddToCart;
