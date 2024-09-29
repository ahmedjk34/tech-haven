import React from "react";
import styles from "./searchPage.module.scss";
import CategorySelector from "./_components/CategorySelector";
import SideBar from "./_components/SideBar";
import ItemsHolder from "./_components/ItemsHolder";

type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

function page({ params, searchParams }: Props) {
  return (
    <div className={styles.searchPage}>
      <CategorySelector />
      <SideBar />
      <ItemsHolder searchParams={searchParams} />
    </div>
  );
}

export default page;
