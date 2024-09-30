"use client";
import React from "react";
//@ts-ignore
import Slider from "@madzadev/image-slider";
import "@madzadev/image-slider/dist/index.css";
import styles from "../itemPage.module.scss";
type Props = {
  images: string[];
};

function ImageSlider({ images }: Props) {
  return (
    <div className={styles.imageSliderContainer}>
      <Slider
        imageList={images.map((image) => ({
          url: image,
        }))}
        loop={true}
        autoPlay={true}
        autoPlayInterval={3000}
        showDotControls={false}
        showArrowControls={false}
        width={"100%"}
      />
    </div>
  );
}

export default ImageSlider;
