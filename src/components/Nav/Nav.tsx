"use client";
import React, { useState } from "react";
import styles from "./nav.module.scss";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { CgShoppingCart, CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import InputHolder from "./InputHolder";
import CartWindow from "./CartWindow";
import { SessionUser } from "@/util/Types";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

function Nav({ session }: Props) {
  const router = useRouter();
  const [isCartActive, setIsCartActive] = useState(false);
  const user = session?.user as SessionUser | null;
  console.log(user);
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
          <CgProfile
            size={30}
            className={styles.icon}
            onClick={() => {
              user ? "" : router.push("/register");
            }}
          />
        </div>
      </div>
      <CartWindow active={isCartActive} toggleActivity={setIsCartActive} />
    </>
  );
}

export default Nav;
