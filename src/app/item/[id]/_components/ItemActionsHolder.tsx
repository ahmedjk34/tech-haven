"use client";
import React, { useEffect } from "react";
import { ItemType } from "@/util/Types";
import { useCart } from "@/components/CartProvider/CartProvider";
import { addItemToCart } from "@/util/cartActions";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";

type Props = {
  item: ItemType;
};

function ItemActionsHolder({ item }: Props) {
  const { cart, setCart } = useCart();
  const handleAddToCart = () => {
    addItemToCart(cart, setCart, item);
  };
  const { data: session, update } = useSession();
  const handleAddToWishList = async () => {
    try {
      if (session?.user) {
        await axios.post(
          `http://localhost:3000/api/user/${session.user.id}/wishlist/${item._id}`
        );
        const itemExists = session.user.wishlist.some(
          (existingItem) => existingItem._id === item._id
        );
        if (!itemExists) {
          await update({
            ...session,
            user: {
              ...session.user,
              wishlist: [...session.user.wishlist, item],
            },
          });
          window.location.reload();
        }
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
        <div onClick={async () => await handleAddToWishList()}>
          Add to wishlist +
        </div>
      )}
    </div>
  );
}

export default ItemActionsHolder;
