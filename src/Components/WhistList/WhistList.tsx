import React from "react";
import { shallowEqual } from "react-redux";
import { addWhistList } from "../../Assets/svg/icons/whistList";
import { useAppSelector } from "../../Hooks/Hook";
import WhistItem from "./whistItem/WhistItem";
import styles from "./whistList.module.scss";

const WhistList = () => {
  const movieTv = useAppSelector(
    (store) => store.movies.iconWhistListMovieId,
    shallowEqual
  );
  return (
    <div className={styles.container}>
      {movieTv.length === 0 ? (
        <div className={styles.container_empty}>
          <span>{addWhistList(80)}</span>
          <h2>Your watchlist is empty</h2>
        </div>
      ) : (
        <div className={styles.container_list}>
          <h1>Watchlist</h1>
          <h4>My Movies & Series</h4>
          <div className={styles.container_list_card}>
            {movieTv.map((movie) => {
              const remainder = movieTv.length % 5;
              const lastItems = movieTv.slice(
                remainder === 0 ? -5 : -remainder
              );
              const active =
                movieTv.length <= 5
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

export default WhistList;
