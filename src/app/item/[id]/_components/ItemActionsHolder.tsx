"use client";
import React from "react";
import { ItemType } from "@/util/Types";
import { useCart } from "@/components/CartProvider/CartProvider";
import { addItemToCart } from "@/util/cartActions";
import axios from "axios";
import { Session } from "next-auth";

type Props = {
  item: ItemType;
  session: Session | null;
};

function ItemActionsHolder({ item, session }: Props) {
  const { cart, setCart } = useCart();

  // Function to handle adding to cart
  const handleAddToCart = () => {
    addItemToCart(cart, setCart, item);
  };

  // Function to handle adding to wishlist
  const handleAddToWishList = async () => {
    try {
      if (session?.user) {
        await axios.post(
          `http://localhost:3000/api/user/${session.user.id}/wishlist/${item._id}`
        );
        alert(`${item.name} added to wishlist!`);
      } else {
        alert("You need to be logged in to add to wishlist.");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Failed to add to wishlist.");
    }
  };

  return (
    <div>
      <h3>{item.stock} Available in stock</h3>
      <button onClick={handleAddToCart}>Add {item.name} to cart +</button>
      {session?.user && (
        <div onClick={handleAddToWishList}>Add to wishlist +</div>
      )}
    </div>
  );
}

export default ItemActionsHolder;
