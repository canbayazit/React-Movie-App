import React, { useState } from "react";
import Cast from "./NavContents/Cast/Cast";
import Comment from "./NavContents/Comments/Comment";
import Crew from "./NavContents/Crew/Crew";
import Suggested from "./NavContents/Suggested/Suggested";
import styles from "./list.module.scss";
import { useParams } from "react-router";
import Known from "./NavContents/Known/Known";
import PersonDetail from "./NavContents/Detail/PersonNavDetail";

interface INavItem {
  id: number;
  name: string;
  component: JSX.Element;
}

interface INav {
  movie: INavItem[];
  person:INavItem[];
  tv:INavItem[];
}
const navList: INav = {
  movie: [
    { id: 1, name: "SUGGESTED", component: <Suggested/> },
    { id: 2, name: "CAST", component: <Cast/> },
    { id: 3, name: "CREW", component: <Crew/> },
    { id: 4, name: "COMMENT", component: <Comment/> },
  ],
  person: [
    { id: 1, name: "MOVIES", component: <Known keys="movie" credit="movie_credits"/> },
    { id: 2, name: "TV SHOWS", component: <Known keys="tv" credit="tv_credits"/> },
    { id: 3, name: "DETAIL", component: <PersonDetail/> },
  ],
  tv:[
    { id: 1, name: "SUGGESTED", component: <Suggested/> },
    { id: 2, name: "CAST", component: <Cast/> },
    { id: 3, name: "CREW", component: <Crew/> },
    { id: 4, name: "COMMENT", component: <Comment/> },
  ]
};
const NavList = () => {
  const {category}=useParams();
  const [index, setIndex] = useState<number>(0);
  const handleClick = (i: number) => {
    setIndex(i);
  };
  return (
    <div className={styles.container}>
      <nav className={styles.container_nav}>
        {navList[category as keyof INav].map((item, i) => (
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
      {navList[category as keyof INav].map((item, i) => (
        <div
          key={item.id}
          className={
            index === i
              ? `${styles.container_nav_content} ${styles.active}`
              : styles.container_nav_content
          }
        >
          {item.component}
        </div>
      ))}
    </div>
  );
};

export default NavList;
