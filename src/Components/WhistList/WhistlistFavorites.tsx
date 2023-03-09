import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { addWhistList } from "../../Assets/svg/icons/whistList";
import { useAppSelector } from "../../Hooks/Hook";
import { IICon } from "../../Types/sliceStates";
import WhistItem from "./MovieItem/MovieItem";
import styles from "./whistlistFavorites.module.scss";
const WhistlistFavorites = () => {
  const [data, setData] = useState<IICon[]>();
  const location = useLocation();
  const uid = useAppSelector((store) => store.auth.user.uid, shallowEqual);
  const whistList = useAppSelector(
    (store) => store.movies.watchList,
    shallowEqual
  );
  const favoritesList = useAppSelector(
    (store) => store.movies.favoriteList,
    shallowEqual
  );
  console.log(favoritesList);
  useEffect(() => {
    setData((prev) =>
      location.pathname === "/whistlist"
        ? (prev = whistList)
        : location.pathname === "/favorites"
        ? (prev = favoritesList)
        : (prev = [])
    );
  }, [favoritesList, location.pathname, whistList]);
  console.log(data, "data");

  return (
    <div className={styles.container}>
      {!uid ? (
        <div className={styles.container_empty}>
          <span>{addWhistList(80)}</span>
          <h2>You must be <Link to={"/login"}>Logged In</Link> to review your list.</h2>
        </div>
      ) : data?.length === 0 ? (
        <div className={styles.container_empty}>
          <span>{addWhistList(80)}</span>

          {location.pathname === "/whistlist" && (
            <h2>Your watchlist is empty</h2>
          )}
          {location.pathname === "/favorites" && (
            <h2>Your favorites list is empty</h2>
          )}
        </div>
      ) : (
        <div className={styles.container_list}>
          {location.pathname === "/whistlist" && <h1>Watchlist</h1>}
          {location.pathname === "/favorites" && <h1>Favorites List</h1>}
          <h4>My Movies & Series</h4>
          <div className={styles.container_list_card}>
            {data?.map((movie) => {
              const remainder = data?.length % 5;
              const lastItems = data?.slice(remainder === 0 ? -5 : -remainder);
              const active =
                data?.length <= 5
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

export default WhistlistFavorites;
