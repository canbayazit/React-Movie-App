import React, { useState } from "react";
import Cast from "../../NavContents/Cast/Cast";
import Crew from "../../NavContents/Crew/Crew";
import Detail from "../../NavContents/Detail/Detail";
import Suggested from "../../NavContents/Suggested/Suggested";
import styles from "./list.module.scss";

interface INavItem {
  id: number;
  name: string;
  component:JSX.Element
}
const navList: INavItem[] = [
  { id: 1, name: "SUGGESTED",component: <Suggested/>},
  { id: 2, name: "CAST",component: <Cast/> },
  { id: 3, name: "CREW" ,component: <Crew/>},
  { id: 4, name: "DETAIL" ,component: <Detail/>},
];
const NavList = () => {
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
      {
        navList.map((item,i)=>(
          <div className={index === i
            ? `${styles.container_nav_content} ${styles.active}`
            : styles.container_nav_content}>
              {item.component}             
          </div>
        ))
      } 
    </div>
  );
};

export default NavList;
