"use client";
import React, { useEffect, useState } from "react";
import styles from "../searchPage.module.scss";
import MultiRangeSlider from "multi-range-slider-react";
import { useSearchParams } from "next/navigation";
import subCategoriesFilterData from "./data";

type Props = {};

function SideBar({}: Props) {
  const [minValue, setMinValue] = useState(25);
  const [maxValue, setMaxValue] = useState(75);
  const handleInput = (e: any) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };
  const searchParams = useSearchParams();
  const [subCategories, setSubCategories] = useState<{
    [key: string]: string[];
  }>({});
  const [brands, setBrands] = useState<String[]>([]);
  const category = searchParams.get("category");
  useEffect(() => {
    if (category) {
      //@ts-ignore
      const categoryData = subCategoriesFilterData[category];
      if (categoryData) {
        setSubCategories(categoryData.subcategories);
        setBrands(categoryData.brands);
        console.log(categoryData);
      }
    }
  }, [category]);
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
      <div className={styles.subCategorySelector}>
        <div>
          <h3> Brands:</h3>
          {brands.map((brand) => (
            <ul key={brand + "BRANDS"}>{brand}</ul>
          ))}
        </div>
        {Object.entries(subCategories).map(([title, items]) => (
          <div key={title}>
            <h3>{title}</h3>
            <ol>
              {items.map((item) => (
                <ul key={item + "ITEM"}>{item}</ul>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
