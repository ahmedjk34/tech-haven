"use client";
import React from "react";
import styles from "./nav.module.scss";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { CgShoppingCart, CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import InputHolder from "./InputHolder";

type Props = {};

function Nav({}: Props) {
  const router = useRouter();

  return (
    <div className={styles.nav}>
      <Image src={logo} alt="logo" onClick={() => router.push("/")} />
      <InputHolder />
      <div className={styles.iconsHolder}>
        <CgShoppingCart size={30} className={styles.icon} />
        <h2>|</h2>
        <CgProfile size={30} className={styles.icon} />
      </div>
    </div>
  );
}

export default Nav;
