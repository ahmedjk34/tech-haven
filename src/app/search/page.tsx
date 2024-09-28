import React from "react";
import styles from "./searchPage.module.scss";
import CategorySelector from "./_components/CategorySelector";
type Props = {};

function page({}: Props) {
  return (
    <div className={styles.searchPage}>
      <CategorySelector />
    </div>
  );
}

export default page;
