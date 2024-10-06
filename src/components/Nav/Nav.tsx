"use client";
import React, { useEffect, useState } from "react";
import styles from "./nav.module.scss";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { CgShoppingCart, CgProfile } from "react-icons/cg";
import { usePathname, useRouter } from "next/navigation";
import InputHolder from "./InputHolder";
import CartWindow from "./CartWindow";

import { SessionProvider, getSession, useSession } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

function Nav({ session }: Props) {
  const router = useRouter();
  const [isCartActive, setIsCartActive] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState(session?.user);
  useEffect(() => {
    setUser(session?.user);
    console.log("Nav Update", user);
  }, [session]);

  const handleProfileClick = () => {
    if (user) {
      const params = new URLSearchParams(window.location.search);
      params.set("modal", "true");
      router.push(`${pathname}?${params.toString()}`);
    } else {
      router.push("/register");
    }
  };

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
            onClick={handleProfileClick}
          />
        </div>
      </div>
      <SessionProvider session={session}>
        <CartWindow active={isCartActive} toggleActivity={setIsCartActive} />
      </SessionProvider>
    </>
  );
}

export default Nav;
