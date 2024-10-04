"use client";

import React, { useState } from "react";
import styles from "./userModal.module.scss";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";
import { SessionUser } from "@/util/Types";
import { formatPriceAfterDiscount } from "@/util/priceUtil";
import { useSession } from "next-auth/react";

type Props = {};
function UserModal({}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [section, setSection] = useState("Wishlist");
  const { data: session, update } = useSession();
  const user = session?.user as SessionUser | null;
  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    router.push(`${pathname}?${params.toString()}`);
  };
  console.log(session);

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
                    <div className={styles.wishlistItem}>
                      <img src={item.images[0]} alt={item.name} />
                      <div>
                        <h1>{item.name}</h1>
                        <div>
                          <button
                            onClick={() => router.push(`/item/${item._id}`)}
                          >
                            Go to Item
                          </button>
                          <button>Remove from wishlist</button>
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
              <div></div>
            )}
          </div>
        </dialog>
      )}
    </>
  );
}

function formatDate(date: Date = new Date()): string {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

  // Function to add suffix to day (st, nd, rd, th)
  const getDaySuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th"; // Covers 4th-20th
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

// {user?.purchaseHistory.map((piece) => {
//   const { itemWithQuantity, timeOfPurchase } = piece;
//   const { data: item, quantity } = itemWithQuantity;
//   console.log(item);
//   return (
//     <div>
//       {/* img src={item.images[0]} alt={item.name}></img>
//       <h1>{item.name}</h1>
//       <div>
//         <h3 className={styles.price}>
//           {formatPriceAfterDiscount(item.price, item.discount)}$
//         </h3>
//       </div> */}
//     </div>
//   );
// })}
