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
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<{
    [group: string]: string;
  }>(
    searchParams
      .get("subCategories")
      ?.split(",")
      .reduce((acc: { [group: string]: string }, item) => {
        acc[item] = item;
        return acc;
      }, {}) || {}
  );

  const [activeGroup, setActiveGroup] = useState<string | null>(null); // New state to track active group
  const router = useRouter();
  const category = searchParams.get("category");

  useEffect(() => {
    if (category) {
      //@ts-ignore
      const categoryData = subCategoriesFilterData[category];
      if (categoryData) {
        setSubCategories(categoryData.subcategories);
        setBrands(categoryData.brands);
      }
    }
  }, [category]);

  const handleSelection = (group: string, value: string) => {
    const updatedItems = { ...selectedItems, [group]: value };

    setSelectedItems(updatedItems);

    const selectedValues = Object.values(updatedItems);
    const searchParams = new URLSearchParams(window.location.search);

    if (selectedValues.length > 0) {
      searchParams.set("subCategories", selectedValues.join(","));
    } else {
      searchParams.delete("subCategories");
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
        <h2>Sub Categories</h2>
        <div>
          <h4
            className={styles.title}
            onClick={
              () => setActiveGroup(activeGroup === "Brands" ? null : "Brands") // Toggle active state for Brands
            }
          >
            Brands
          </h4>
          <ol
            className={`${activeGroup === "Brands" ? styles.active : ""}`} // Apply "active" class if it's the active group
          >
            {brands.map((brand) => (
              <li key={brand + "BRAND"}>
                <label>
                  <input
                    type="radio"
                    name="brand"
                    value={brand}
                    checked={selectedItems["brand"] === brand}
                    onChange={() => handleSelection("brand", brand)}
                  />
                  {brand}
                </label>
              </li>
            ))}
          </ol>
        </div>
        {Object.entries(subCategories).map(([title, items]) => (
          <div key={title}>
            <h4
              className={styles.title}
              onClick={
                () => setActiveGroup(activeGroup === title ? null : title) // Toggle active state for each subcategory
              }
            >
              {title}
            </h4>
            <ol
              className={`${activeGroup === title ? styles.active : ""}`} // Apply "active" class if it's the active group
            >
              {items.map((item) => (
                <li key={item + "ITEM"}>
                  <label>
                    <input
                      type="radio"
                      name={title}
                      value={item}
                      checked={selectedItems[title] === item}
                      onChange={() => handleSelection(title, item)}
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
