import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { addWhistList } from "../../Assets/svg/icons/whistList";
import { useAppSelector } from "../../Hooks/Hook";
import styles from "./favorite.module.scss";
import WhistItem from "./MovieItem/MovieItem";
const FavoriteList = () => {
  const location = useLocation();
  const uid = useAppSelector((store) => store.auth.user.uid, shallowEqual);
  const favoritesList = useAppSelector(
    (store) => store.movies.favoriteList,
    shallowEqual
  );

  return (
    <div className={styles.container}>
      {!uid ? (
        <div className={styles.container_empty}>
          <span>{addWhistList(80)}</span>
          <h2>
            You must be <Link to={"/login"}>Logged In</Link> to review your
            list.
          </h2>
        </div>
      ) : favoritesList?.length === 0 ? (
        <div className={styles.container_empty}>
          <span>{addWhistList(80)}</span>
          <h2>Your favorites list is empty</h2>
        </div>
      ) : (
        <div className={styles.container_list}>
          {location.pathname === "/whistlist" && <h1>Watchlist</h1>}
          {location.pathname === "/favoritelist" && <h1>Favorites List</h1>}
          <h4>My Movies & Series</h4>
          <div className={styles.container_list_card}>
            {favoritesList?.map((movie) => {
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
              return <WhistItem active={active} movie={movie} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteList;
