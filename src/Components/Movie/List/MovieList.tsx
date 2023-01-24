import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./list.module.scss";
interface INavItem {
  id: number;
  name: string;
}
const navList: INavItem[] = [
  { id: 1, name: "SUGGESTED" },
  { id: 2, name: "CASTS" },
  { id: 3, name: "DETAIL" },
];
const MovieList = () => {
  const { category, id } = useParams();
  const [index, setIndex] = useState<number>(0);
  const handleClick = (i: number) => {
    setIndex(i);
  };
  return (
    <div className={styles.container}>
      <nav className={styles.container_nav}>
        {navList.map((item, i) => (
          <div
            key={item.id}
            onClick={() => handleClick(i)}
            className={
              index === i
                ? `${styles.container_nav_bar} ${styles.active}`
                : styles.container_nav_bar
            }
          >
            {item.name}
          </div>
        ))}
        <div className={styles.indicator}></div>
      </nav>
      <div className={styles.container_slider}></div>
    </div>
  );
};

export default MovieList;
