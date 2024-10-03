"use client";

import React from "react";
import styles from "./userModal.module.scss";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";

type Props = {};

function UserModal({}: Props) {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();
  return (
    <>
      {modal && (
        <dialog className={styles.dialog}>
          <div className={styles.dialogContent}>
            <Link href={pathname}>
              <IoCloseSharp color="red" />
            </Link>
          </div>
        </dialog>
      )}
    </>
  );
}

export default UserModal;
