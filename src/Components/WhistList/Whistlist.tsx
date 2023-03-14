import { shallowEqual } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { addWhistList } from "../../Assets/svg/icons/whistList";
import { useAppSelector } from "../../Hooks/Hook";
import WhistItem from "./MovieItem/MovieItem";
import styles from "./whistlist.module.scss";
const Whistlist = () => {
  const location = useLocation();
  const uid = useAppSelector((store) => store.auth.user.uid, shallowEqual);
  const whistList = useAppSelector(
    (store) => store.movies.watchList,
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
      ) : whistList?.length === 0 ? (
        <div className={styles.container_empty}>
          <span>{addWhistList(80)}</span>
          <h2>Your watchlist is empty</h2>
        </div>
      ) : (
        <div className={styles.container_list}>
          {location.pathname === "/whistlist" && <h1>Watchlist</h1>}
          {location.pathname === "/favoritelist" && <h1>Favorites List</h1>}
          <h4>My Movies & Series</h4>
          <div className={styles.container_list_card}>
            {whistList?.map((movie) => {
              const remainder = whistList?.length % 5;
              const lastItems = whistList?.slice(
                remainder === 0 ? -5 : -remainder
              );
              const active =
                whistList?.length <= 5
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

export default Whistlist;
