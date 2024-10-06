"use client";
import React from "react";
import axios from "axios";
import styles from "./nav.module.scss";
import { useCart } from "../CartProvider/CartProvider";
import { ContextType } from "../../util/Types";
import {
  calculateTotalPrice,
  extractTotalPriceFromCart,
  formatPriceAfterDiscount,
} from "@/util/priceUtil";
import {
  addItemToCart,
  clearCart,
  deleteItemFromCart,
} from "@/util/cartActions";
import { useSession } from "next-auth/react";

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
          `https://tech-haven-k1h5z2nm8-ahmedjk34s-projects.vercel.app/api/user/${session?.user.id}/history`,
          { cart }
        );
        const purchaseHistory = cart.map((item) => ({
          itemWithQuantity: {
            data: item.data,
            quantity: item.quantity,
          },
          timeOfPurchase: new Date(),
        }));
        await update({
          ...session,
          user: {
            ...session?.user,
            purchaseHistory: [
              ...session?.user.purchaseHistory,
              ...purchaseHistory,
            ],
          },
        });
        window.location.reload();
      }
      clearCart(setCart);
      toggleActivity(false);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

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
        <div className={styles.checkOutSection}>
          {cart.length ? (
            <>
              <h3>Total Price : {extractTotalPriceFromCart(cart)}$</h3>
              <h2 onClick={handleCheckout} className={styles.checkOut}>
                Checkout
              </h2>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CartWindow;
