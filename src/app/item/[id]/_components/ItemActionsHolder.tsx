"use client";
import React, { useState, useEffect } from "react";
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
  const { data: session, update } = useSession();

  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [buttonText, setButtonText] = useState<string>(
    `Add ${item.name} to cart +`
  );

  const handleAddToCart = () => {
    addItemToCart(cart, setCart, item);
  };

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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Update button text based on the window width
    if (windowWidth < 1300) {
      setButtonText("Add to cart +");
    } else {
      setButtonText(`Add ${item.name} to cart +`);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth, item.name]);

  return (
    <div>
      <h3>{item.stock} Available in stock</h3>
      <button onClick={handleAddToCart}>{buttonText}</button>
      {session?.user && (
        <div onClick={async () => await handleAddToWishList()}>
          Add to wishlist +
        </div>
      )}
    </div>
  );
}

export default ItemActionsHolder;
