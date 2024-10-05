"use client";
import React, { useEffect, useState } from "react";
import styles from "./userModal.module.scss";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";
import { formatPriceAfterDiscount } from "@/util/priceUtil";
import { useSession } from "next-auth/react";
import uuid4 from "uuid4";
import axios from "axios";

type Props = {};
function UserModal({}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [section, setSection] = useState("Wishlist");
  const { data: session, update } = useSession();
  const [user, setUser] = useState(session?.user);
  const [itemBeingRemoved, setItemBeingRemoved] = useState<string | null>(null);

  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setUser(session?.user);
  }, [session]);

  async function handleDeleteItem(itemId: string) {
    setItemBeingRemoved(itemId); // Set the item being removed
    await axios.delete(
      `http://localhost:3000/api/user/${user?.id}/wishlist/${itemId}`
    );
    await update({
      ...session,
      user: {
        ...session?.user,
        wishlist: session?.user?.wishlist.filter(
          (wishlistItem) => wishlistItem._id !== itemId
        ),
      },
    });
    setItemBeingRemoved(null); // Reset after removal
  }

  const modal = searchParams.get("modal");
  return (
    <>
      {modal && (
        <dialog className={styles.dialog}>
          <div className={styles.dialogContent}>
            <button onClick={handleCloseModal} className={styles.closeButton}>
              <IoCloseSharp color="red" />
            </button>
            <h1 className={styles.sectionSelectors}>
              <span onClick={() => setSection("Wishlist")}>Wishlist</span>
              <span onClick={() => setSection("Purchase History")}>
                Purchase History
              </span>
            </h1>
            {section === "Wishlist" ? (
              <div className={styles.wishlistSection}>
                {user?.wishlist.map((item) => {
                  return (
                    <div
                      className={`${styles.wishlistItem} ${
                        itemBeingRemoved === item._id ? styles.fadeOut : ""
                      }`}
                      key={uuid4()}
                    >
                      <img src={item.images[0]} alt={item.name} />
                      <div>
                        <h1>{item.name}</h1>
                        <div>
                          <button
                            onClick={() => router.push(`/item/${item._id}`)}
                          >
                            Go to Item
                          </button>
                          <button
                            onClick={async () =>
                              await handleDeleteItem(item._id)
                            }
                          >
                            Remove from wishlist
                          </button>
                          <h3 className={styles.price}>
                            {formatPriceAfterDiscount(
                              item.price,
                              item.discount
                            )}
                            $
                          </h3>
                          <h3 className={styles.availableInStock}>
                            {item.stock} Available in stock
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.purchaseHistorySection}>
                {user?.purchaseHistory.map((piece) => {
                  const { itemWithQuantity, timeOfPurchase } = piece;
                  const { data: item, quantity } = itemWithQuantity;
                  return (
                    <div className={styles.purchaseHistoryItem} key={uuid4()}>
                      <img src={item.images[0]} alt={item.name} />
                      <h1>{item.name}</h1>
                      <div>
                        <h3 className={styles.price}>
                          Price:
                          {formatPriceAfterDiscount(item.price, item.discount)}$
                        </h3>
                        <h3>Quantity: {quantity}</h3>
                        <h3>Purchased on: {formatDate(timeOfPurchase)}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </dialog>
      )}
    </>
  );
}

function formatDate(date: string | Date = new Date()): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();

  const getDaySuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dayWithSuffix = `${day}${getDaySuffix(day)}`;

  return `${dayWithSuffix} of ${month}, ${year}`;
}

export default UserModal;
