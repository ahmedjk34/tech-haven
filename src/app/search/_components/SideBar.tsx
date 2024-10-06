"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "../searchPage.module.scss";
import MultiRangeSlider from "multi-range-slider-react";
import { useSearchParams, useRouter } from "next/navigation";
import subCategoriesFilterData from "./data";

type Props = {};

function SideBar({}: Props) {
  const searchParams = useSearchParams();
  const [minValue, setMinValue] = useState(
    parseInt(searchParams.get("minPrice") ?? "50", 10)
  );
  const [maxValue, setMaxValue] = useState(
    parseInt(searchParams.get("maxPrice") ?? "1000", 10)
  );
  const router = useRouter();
  const category = searchParams.get("category");

  const [subCategories, setSubCategories] = useState<{
    [key: string]: string[];
  }>({});
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<{
    [group: string]: string;
  }>({});
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const updatePriceParams = (min: number, max: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("minPrice", String(min));
    searchParams.set("maxPrice", String(max));

    router.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

  const handleInput = (e: any) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      updatePriceParams(e.minValue, e.maxValue);
    }, 500);
  };

  useEffect(() => {
    setSelectedItems({});
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("subCategories");
    searchParams.delete("brand");
    router.replace(`${window.location.pathname}?${searchParams.toString()}`);

    if (category) {
      //@ts-ignore
      const categoryData = subCategoriesFilterData[category];
      if (categoryData) {
        setSubCategories(categoryData.subcategories);
        setBrands(categoryData.brands);
      }
    } else {
      setSubCategories(subCategoriesFilterData["General"].subcategories);
      setBrands(subCategoriesFilterData["General"].brands);
    }
  }, [category, router]);

  const handleSelection = (group: string, value: string) => {
    const updatedItems = { ...selectedItems, [group]: value };
    setSelectedItems(updatedItems);

    const searchParams = new URLSearchParams(window.location.search);

    if (group === "brand") {
      searchParams.set("brand", value);
    } else {
      const subCategoryValues = Object.keys(updatedItems)
        .filter((key) => key !== "brand")
        .map((key) => updatedItems[key]);

      if (subCategoryValues.length > 0) {
        searchParams.set("subCategories", subCategoryValues.join(","));
      } else {
        searchParams.delete("subCategories");
      }
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
          onInput={(e) => handleInput(e)}
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
            onClick={() =>
              setActiveGroup(activeGroup === "Brands" ? null : "Brands")
            }
          >
            Brands
          </h4>
          <ol className={`${activeGroup === "Brands" ? styles.active : ""}`}>
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
          <div key={title + "SUB CATEGORY"}>
            <h4
              className={styles.title}
              onClick={() =>
                setActiveGroup(activeGroup === title ? null : title)
              }
            >
              {title}
            </h4>
            <ol className={`${activeGroup === title ? styles.active : ""}`}>
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
