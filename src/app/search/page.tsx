import React from "react";
import styles from "./searchPage.module.scss";
import CategorySelector from "./_components/CategorySelector";
import SideBar from "./_components/SideBar";

type Props = {};

function page({}: Props) {
  return (
    <div className={styles.searchPage}>
      <CategorySelector />
      <SideBar />
    </div>
  );
}

export default page;
