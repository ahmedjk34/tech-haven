import { ItemType } from "@/util/Types";
import styles from "./itemCard.module.scss";
import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  item: ItemType;
};

function ItemCard({ item }: Props) {
  const { name, images, _id, price, discount, subCategories } = item;
  const showImage = images[0];
  return (
    <Link className={styles.item} href={`/item/${item._id}`}>
      <div className={styles.imageHolder}>
        <Image src={showImage} alt={name} loading="lazy" layout="fill" />
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.mainInfo}>
          <h3>{name}</h3>
          <p>
            {discount !== 0
              ? (price - (price * discount) / 100).toFixed(2) // Subtract discount from price
              : price.toFixed(2)}
            $
          </p>
        </div>
        <div className={styles.subCategories}>
          {subCategories.map((subCategory) => (
            <div>{subCategory}</div>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
