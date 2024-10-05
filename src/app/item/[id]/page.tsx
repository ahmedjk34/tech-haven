import React from "react";
import styles from "./itemPage.module.scss";
import axios from "axios";
import { ItemType } from "@/util/Types";
import ImageSlider from "./_components/ImageSlider";
import ItemCard from "@/components/ItemCard/ItemCard";
import ItemActionsHolder from "./_components/ItemActionsHolder";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

type Props = {
  params: { id: string };
};

async function page({ params }: Props) {
  try {
    const itemDataResponse = await axios.get(
      `http://localhost:3000/api/item/${params.id}`
    );

    const {
      item,
      recommendedItems,
    }: {
      item: ItemType;
      recommendedItems: ItemType[];
    } = itemDataResponse.data;
    const session = await auth();

    if (itemDataResponse.status == 200)
      return (
        <>
          <div className={styles.itemPage}>
            <div className={styles.infoHolder}>
              <ImageSlider images={item.images} />
              <div className={styles.titleAndStockHolder}>
                <h1>{item.name}</h1>
                <ItemActionsHolder item={item} />
              </div>
              <div className={styles.mainInfo}>
                <div className={styles.specificationTable}>
                  {Object.entries(item.specifications).map((spec) => {
                    const [unformattedTitle, description] = spec;
                    const title = unformattedTitle
                      .split("_") // Split the string by underscores
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      ) // Capitalize the first letter of each word
                      .join(" ");
                    return (
                      <div key={title + description}>
                        <p>{title}</p>
                        <p>{description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.recommendedItemsHolder}>
            <h1>Recommended Items</h1>
            <div className={styles.itemsHolder}>
              {recommendedItems.map((item: ItemType) => (
                <ItemCard item={item} key={item._id + "RECOMMENDED"} />
              ))}
            </div>
          </div>
        </>
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
