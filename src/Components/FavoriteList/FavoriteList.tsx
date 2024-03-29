import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import { addFavorite } from "../../Assets/svg/icons/addFavorite";
import { deleteFavorite } from "../../Assets/svg/icons/deleteFavorite";
import { addWhistList } from "../../Assets/svg/icons/whistList";
import { useAppSelector } from "../../Hooks/Hook";
import styles from "./favorite.module.scss";
import WhistItem from "./MovieItem/MovieItem";
const FavoriteList = () => {
  const { t } = useTranslation();
  const uid = useAppSelector((store) => store.auth.user.uid, shallowEqual);
  const favoritesList = useAppSelector(
    (store) => store.movies.favoriteList,
    shallowEqual
  );

  return (
    <div className={styles.container}>
      {!uid ? (
        <div className={styles.container_empty}>
          <span>{deleteFavorite(80,"#fff")}</span>
          <h2>{t("notLoggedIn")}</h2>
        </div>
      ) : favoritesList?.length === 0 ? (
        <div className={styles.container_empty}>
          <span>{deleteFavorite(80,"#fff")}</span>
          <h2>{t("emptyfavoriteList")}</h2>
        </div>
      ) : (
        <div className={styles.container_list}>
          <h1>{t("favoriteListTitle")}</h1>
          <h4>{t("listTag")}</h4>
          <div className={styles.container_list_card}>
            {favoritesList?.map((movie,i) => {
              const remainder = favoritesList?.length % 5;
              const lastItems = favoritesList?.slice(
                remainder === 0 ? -5 : -remainder
              );
              const active =
                favoritesList?.length <= 5
                  ? false
                  : lastItems.includes(movie)
                  ? true
                  : false;
              return (
                <div key={i} className={styles.container_list_card_item}>
                  <WhistItem active={active} movie={movie} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteList;
