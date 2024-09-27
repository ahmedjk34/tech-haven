"use client";
import React, { useState } from "react";
import styles from "./nav.module.scss";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { CgShoppingCart, CgProfile } from "react-icons/cg";

type Props = {};

function Nav({}: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.nav}>
      <Image src={logo} alt="logo" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <div className={styles.iconsHolder}>
        <CgShoppingCart size={30} className={styles.icon} />
        <h2>|</h2>
        <CgProfile size={30} className={styles.icon} />
      </div>
    </div>
  );
}

export default Nav;
