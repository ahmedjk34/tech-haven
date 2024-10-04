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
              <div>Purches</div>
            )}
          </div>
        </dialog>
      )}
    </>
  );
}

export default UserModal;
