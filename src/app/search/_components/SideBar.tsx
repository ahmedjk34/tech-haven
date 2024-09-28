"use client";
import React, { useState } from "react";
import styles from "../searchPage.module.scss";
import MultiRangeSlider from "multi-range-slider-react";
import { useSearchParams } from "next/navigation";

type Props = {};

function SideBar({}: Props) {
  const [minValue, setMinValue] = useState(25);
  const [maxValue, setMaxValue] = useState(75);
  const handleInput = (e: any) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };
  const searchParams = useSearchParams();
  return (
    <div className={styles.sideBar}>
      <div className={styles.priceSelector}>
        <h2>Price Range</h2>
        <MultiRangeSlider
          min={50}
          max={1000}
          step={50}
          stepOnly="true"
          ruler="false"
          className={styles.rangeSlider}
          barInnerColor="green"
          minValue={minValue}
          maxValue={maxValue}
          onInput={(e) => {
            handleInput(e);
          }}
        />
        <h4>
          {minValue}$ - {maxValue}$
        </h4>
      </div>
      <div className={styles.subCategorySelector}></div>
    </div>
  );
}

export default SideBar;
