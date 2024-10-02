"use client";
import React from "react";
import styles from "./nav.module.scss";
import { useCart } from "../CartProvider/CartProvider";
import { ContextType } from "../../util/Types";

type Props = {
  active: boolean;
  toggleActivity: React.Dispatch<React.SetStateAction<boolean>>;
};

function CartWindow({ active, toggleActivity }: Props) {
  const { cart, setCart } = useCart(); // Access cart and setCart from context

  return (
    <div className={`${styles.cartWindow} ${active ? styles.active : ""}`}>
      <div className={styles.wrapper}>
        <h2
          onClick={() => toggleActivity((prev) => !prev)}
          className={styles.closeCart}
        >
          Close The Cart
        </h2>
        <div>
          {cart.length > 0 ? (
            cart.map((item: ContextType) => (
              <div key={item.data._id?.toString()}>
                {item.data.name} - Quantity: {item.quantity}
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartWindow;
