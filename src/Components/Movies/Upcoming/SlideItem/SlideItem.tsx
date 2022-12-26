import React from "react";
import { imageOriginal } from "../../../../Store/constant";
import { Result } from "../../../../Types/upcomingMovies";
import styles from "./slideItem.module.scss";
interface props {
  item: Result;
  index: number;
}
const SlideItem = (props: props) => {
  const { item, index } = props;
  return (
    <div key={item.id} className={styles.container_background}>
      <img
        src={`${imageOriginal}${item.backdrop_path}`}
        alt=""
        className={styles.container_background_image}
      />
    </div>
  );
};

export default SlideItem;
