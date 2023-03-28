import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { boolean } from "yup";
import { deleteFavorite } from "../../Assets/svg/icons/deleteFavorite";
import { home } from "../../Assets/svg/icons/home";
import { language } from "../../Assets/svg/icons/language";
import { addWhistList } from "../../Assets/svg/icons/whistList";
import styles from "./menu.module.scss";

interface INavItem {
  id: number;
  name: string;
  to: string;
  icon: (size: number, color: string) => JSX.Element;
  size: number;
}
const Menu = () => {
  const [status, setStatus] = useState<boolean>(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const headerList: INavItem[] = [
    { id: 1, name: t("home"), to: "/", icon: home, size: 25 },
    {
      id: 2,
      name: t("watchList"),
      to: "/whistlist",
      icon: addWhistList,
      size: 25,
    },
    {
      id: 3,
      name: t("favoriteList"),
      to: "/favoritelist",
      icon: deleteFavorite,
      size: 23,
    },
  ];
  const changeLang = (lang: string) => {
    if (lang === "en_US") {
      i18n.changeLanguage("tr_TR");
      localStorage.setItem("language", "tr_TR");
    } else {
      i18n.changeLanguage("en_US");
      localStorage.setItem("language", "en_US");
    }
  };

  const handleClick = (path: string) => {
    if (path !== location.pathname) {
      setStatus(true);
    }
  };
  useEffect(() => {
    document.body.classList.add("scroll");
    return () => {
      document.body.classList.remove("scroll");
    };
  }, []);

  return (
    <div
      className={
        status ? `${styles.container} ${styles.active}` : styles.container
      }
    >
      <ul>
        {headerList.map((item, i) => (
          <li key={i} onClick={() => handleClick(item.to)}>
            <Link to={item.to}>
              <span>{item.icon(item.size, "#fff")}</span>
              <h3>{item.name}</h3>
            </Link>
          </li>
        ))}
        <li onClick={() => changeLang(i18n.language)}>
          <span>{language()}</span>
          <h3>{i18n.language.substring(0, 2).toUpperCase()} -</h3>
          <h3>{t("changeLanguage")}</h3>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
