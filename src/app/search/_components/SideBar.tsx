"use client";
import React, { useEffect, useState } from "react";
import styles from "../searchPage.module.scss";

type Props = {};

function SideBar({}: Props) {
  const [lowRangeValue, setLowRangeValue] = useState(1);
  const [highRangeValue, setHighRangeValue] = useState(1500);
  useEffect(() => {
    console.log(lowRangeValue);
  }, [lowRangeValue]);
  return (
    <div className={styles.sideBar}>
      <div className={styles.priceSelector}>
        <h2>Price Range</h2>
        <RangeSlider />
        <h4>
          {lowRangeValue}$ - {highRangeValue}$
        </h4>
      </div>
      <div className={styles.subCategorySelector}></div>
    </div>
  );
}

export default SideBar;
