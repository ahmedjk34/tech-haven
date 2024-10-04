"use client";

import React, { useState } from "react";
import styles from "./userModal.module.scss";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";
import { Session } from "next-auth";
import { SessionUser } from "@/util/Types";

type Props = {
  session: Session | null;
};

function UserModal({ session }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [section, setSection] = useState("Wishlist");
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
              <div>{user?.id}</div>
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
