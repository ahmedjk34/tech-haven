"use client";
import React, { useEffect, useState } from "react";
import styles from "../searchPage.module.scss";
import MultiRangeSlider from "multi-range-slider-react";
import { useSearchParams, useRouter } from "next/navigation";
import subCategoriesFilterData from "./data";

type Props = {};

function SideBar({}: Props) {
  const [minValue, setMinValue] = useState(50);
  const [maxValue, setMaxValue] = useState(1000);
  const handleInput = (e: any) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  const searchParams = useSearchParams();
  const [subCategories, setSubCategories] = useState<{
    [key: string]: string[];
  }>({});
  const [brands, setBrands] = useState<String[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>(
    searchParams.get("subCategory")?.split(",") || []
  );

  const router = useRouter();
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

  const handleSelection = (value: string) => {
    let updatedItems = [...selectedItems];
    if (updatedItems.includes(value)) {
      updatedItems = updatedItems.filter((item) => item !== value);
    } else {
      updatedItems.push(value);
    }
    setSelectedItems(updatedItems);

    const searchParams = new URLSearchParams(window.location.search);
    if (updatedItems.length > 0) {
      searchParams.set("subCategory", updatedItems.join(","));
    } else {
      searchParams.delete("subCategory");
    }
    router.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

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
          <h3>Brands:</h3>
          {brands.map((brand) => (
            <div key={brand + "BRAND"}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(brand as string)}
                  onChange={() => handleSelection(brand as string)}
                />
                {brand}
              </label>
            </div>
          ))}
        </div>
        {Object.entries(subCategories).map(([title, items]) => (
          <div key={title}>
            <h3>{title}</h3>
            <ol>
              {items.map((item) => (
                <li key={item + "ITEM"}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item)}
                      onChange={() => handleSelection(item)}
                    />
                    {item}
                  </label>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
