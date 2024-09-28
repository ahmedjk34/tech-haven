"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../searchPage.module.scss";

type Props = {};

function CategorySelector({}: Props) {
  const router = useRouter();

  // Create a map of categories to their corresponding values
  const categories = new Map<string, string>([
    ["Graphics Cards", "GPU"],
    ["Processors", "CPU"],
    ["Motherboards", "Motherboard"],
    ["Memory (RAM)", "RAM"],
    ["Storage (SSD/HDD)", "Storage"],
    ["Accessories", "Accessories"],
  ]);

  const handleCategorySelection = (key: string) => {
    const value = categories.get(key);
    if (value) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("category", value);
      router.push(`${window.location.pathname}?${searchParams.toString()}`);
    }
  };

  return (
    <div className={styles.categorySelector}>
      {Array.from(categories.keys()).map((category, index) => (
        <div
          key={index + category}
          onClick={() => handleCategorySelection(category)}
          className={styles.categoryOption}
        >
          {category}
        </div>
      ))}
    </div>
  );
}

export default CategorySelector;
