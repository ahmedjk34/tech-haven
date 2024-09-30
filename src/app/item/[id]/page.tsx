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
          <h1>{item.name}</h1>
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
