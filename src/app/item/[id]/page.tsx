import React from "react";
import styles from "./itemPage.module.scss";
import axios from "axios";
import { ItemType } from "@/util/Types";
import ImageSlider from "./_components/ImageSlider";

type Props = {
  params: { id: string };
};

async function page({ params }: Props) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/item/${params.id}`
    );
    const item: ItemType = response.data;
    if (response.status == 200)
      return (
        <div className={styles.itemPage}>
          <div className={styles.titleAndStockHolder}>
            <h1>{item.name}</h1>
            <h3>{item.stock} Available in stock</h3>
          </div>
          <div className={styles.mainInfoHolder}>
            <ImageSlider images={item.images} />
            <div className={styles.mainInfo}></div>
          </div>
        </div>
      );
  } catch (error) {
    return (
      <div>
        <h2>An error fetching data occurred</h2>
      </div>
    );
  }
}

export default page;

// {Object.entries(item.specifications).map((spec) => {
//   const [unformattedTitle, description] = spec;
//   const title = unformattedTitle
//     .split("_") // Split the string by underscores
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
//     .join(" ");
//   return <div key={title + description}></div>;
// })}
