import React, { useState } from "react";
import Cast from "./NavContents/Cast/Cast";
import Comment from "./NavContents/Comments/Comment";
import Crew from "./NavContents/Crew/Crew";
import Suggested from "./NavContents/Suggested/Suggested";
import styles from "./list.module.scss";
import { useParams } from "react-router";
import Known from "./NavContents/Known/Known";
import PersonDetail from "./NavContents/Detail/PersonNavDetail";
import { useTranslation } from "react-i18next";

interface INavItem {
  id: number;
  name: string;
  component: JSX.Element;
}

interface INav {
  movieTv: INavItem[];
  person:INavItem[];
}

const NavList = () => {
  const {category}=useParams();
  const [index, setIndex] = useState<number>(0);
  const { t } = useTranslation();
  const navList: INav = {
    movieTv: [
      { id: 1, name: t('suggested'), component: <Suggested/> },
      { id: 2, name: t('cast'), component: <Cast/> },
      { id: 3, name: t('crew'), component: <Crew/> },
      { id: 4, name: t('comment'), component: <Comment/> },
    ],
    person: [
      { id: 1, name: t('movie'), component: <Known keys="movie" credit="movie_credits"/> },
      { id: 2, name: t('tvShow'), component: <Known keys="tv" credit="tv_credits"/> },
      { id: 3, name: t('detail'), component: <PersonDetail/> },
    ]
  };
  const handleClick = (i: number) => {
    setIndex(i);
  };
  return (
    <div className={styles.container}>
      <nav className={styles.container_nav}>
        {navList[category==="person" ? category :  "movieTv" as keyof INav].map((item, i) => (
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
      {navList[category === "person" ? category : ("movieTv" as keyof INav)].map((item, i) => (
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
