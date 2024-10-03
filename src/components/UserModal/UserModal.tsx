"use client";

import React from "react";
import styles from "./userModal.module.scss";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";

type Props = {};

function UserModal({}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

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
            <button onClick={handleCloseModal}>
              <IoCloseSharp color="red" />
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}

export default UserModal;
