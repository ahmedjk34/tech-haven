"use client";
import React from "react";
import axios from "axios";
import styles from "./nav.module.scss";
import { useCart } from "../CartProvider/CartProvider";
import { ContextType } from "../../util/Types";
import {
  calculateTotalPrice,
  formatPriceAfterDiscount,
} from "@/util/priceUtil";
import {
  addItemToCart,
  clearCart,
  deleteItemFromCart,
} from "@/util/cartActions";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  active: boolean;
  toggleActivity: React.Dispatch<React.SetStateAction<boolean>>;
};

function CartWindow({ active, toggleActivity }: Props) {
  const { cart, setCart } = useCart();
  const { data: session, update } = useSession();
  const handleCheckout = async () => {
    try {
      if (session?.user) {
        const response = await axios.post(
          `http://localhost:3000/api/user/${session?.user.id}/history`,
          { cart }
        );
        console.log("Checkout successful:", response.data);
      }
      clearCart(setCart);
      toggleActivity(false);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  async function handlePurchaseItems() {}

  return (
    <div className={`${styles.cartWindow} ${active ? styles.active : ""}`}>
      <div className={styles.wrapper}>
        <h2
          onClick={() => toggleActivity((prev) => !prev)}
          className={styles.closeCart}
        >
          Close The Cart
        </h2>
        <div className={styles.cartItemsHolder}>
          {cart.length > 0 ? (
            cart.map((item: ContextType) => (
              <div key={item.data._id?.toString()} className={styles.cartItem}>
                <div className={styles.imageHolder}>
                  <img src={item.data.images[0]} />
                </div>
                <div className={styles.cartItemInfo}>
                  <h3>{item.data.name}</h3>
                  <div>
                    <h4
                      className={styles.quantityControl}
                      onClick={() => addItemToCart(cart, setCart, item.data)}
                    >
                      +
                    </h4>
                    <h3>Quantity: {item.quantity}</h3>
                    <h4
                      className={styles.quantityControl}
                      onClick={() =>
                        deleteItemFromCart(cart, setCart, item.data)
                      }
                    >
                      -
                    </h4>
                  </div>
                  <div>
                    <span>
                      Total Price: {item.quantity} X{" "}
                      {formatPriceAfterDiscount(
                        item.data.price,
                        item.data.discount
                      )}
                      $:
                    </span>
                    <h4 style={{ color: "green" }}>
                      {calculateTotalPrice(
                        Number(
                          formatPriceAfterDiscount(
                            item.data.price,
                            item.data.discount
                          )
                        ),
                        item.quantity
                      )}
                      $
                    </h4>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className={styles.emptyCartMessage}>Your cart is empty.</h1>
          )}
        </div>
        {cart.length ? (
          <h2 onClick={handleCheckout} className={styles.checkOut}>
            Checkout
          </h2>
        ) : null}
      </div>
    </div>
  );
}

export default CartWindow;
