"use server";
import React from "react";
import styles from "../searchPage.module.scss";
import axios from "axios";
import { ItemType } from "@/util/Types";
import ItemCard from "../../../components/ItemCard/ItemCard";

type Props = {};

export async function ItemsHolder({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const response = await axios.get(
    `http://localhost:3000/api/item?category=${searchParams?.category}&subCategories=${searchParams?.subCategories}&brand=${searchParams?.brand}`
  );
  const items: ItemType[] = response.data;

  if (response.status == 200)
    return (
      <div className={styles.itemsHolder}>
        {items?.map((item) => (
          <ItemCard item={item} />
        ))}
      </div>
    );
  else
    return (
      <div>
        <h2>An error fetching data occurred</h2>
      </div>
    );
}

export default ItemsHolder;
