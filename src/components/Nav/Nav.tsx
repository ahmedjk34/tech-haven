"use client";
import React, { useState } from "react";
import styles from "./nav.module.scss";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { CgShoppingCart, CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import InputHolder from "./InputHolder";
import CartWindow from "./CartWindow";

type Props = {};

function Nav({}: Props) {
  const router = useRouter();
  const [isCartActive, setIsCartActive] = useState(false);

  return (
    <>
      <div className={styles.nav}>
        <Image src={logo} alt="logo" onClick={() => router.push("/")} />
        <InputHolder />
        <div className={styles.iconsHolder}>
          <CgShoppingCart
            size={30}
            className={styles.icon}
            onClick={() => setIsCartActive((prev) => !prev)}
          />
          <h2>|</h2>
          <CgProfile size={30} className={styles.icon} />
        </div>
      </div>
      <CartWindow active={isCartActive} toggleActivity={setIsCartActive} />
    </>
  );
}

export default Nav;
