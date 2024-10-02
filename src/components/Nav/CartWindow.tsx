"use client";
import React from "react";
import styles from "./nav.module.scss";
import { useCart } from "../CartProvider/CartProvider";

type Props = {
  active: boolean;
  toggleActivity: React.Dispatch<React.SetStateAction<boolean>>;
};

function CartWindow({ active, toggleActivity }: Props) {
  const cartItems = useCart();
  return (
    <div className={`${styles.cartWindow} ${active ? styles.active : ""}`}>
      <div className={styles.wrapper}>
        <h2
          onClick={() => toggleActivity((prev) => !prev)}
          className={styles.closeCart}
        >
          Close The Cart
        </h2>
        <div>{cartItems.map((item) => item.name)}</div>
      </div>
    </div>
  );
}

export default CartWindow;
