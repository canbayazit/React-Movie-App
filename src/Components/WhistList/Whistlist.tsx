import { useTranslation } from "react-i18next";
import { shallowEqual } from "react-redux";
import { addWhistList } from "../../Assets/svg/icons/whistList";
import { useAppSelector } from "../../Hooks/Hook";
import WhistItem from "./MovieItem/MovieItem";
import styles from "./whistlist.module.scss";
const Whistlist = () => {
  const { t } = useTranslation();
  const uid = useAppSelector((store) => store.auth.user.uid, shallowEqual);
  const whistList = useAppSelector(
    (store) => store.movies.watchList,
    shallowEqual
  );

  return (
    <div className={styles.container}>
      {!uid ? (
        <div className={styles.container_empty}>
          <span>{addWhistList(80,"#fff")}</span>
          <h2>{t("notLoggedIn")}</h2>
        </div>
      ) : whistList?.length === 0 ? (
        <div className={styles.container_empty}>
          <span>{addWhistList(80,"#fff")}</span>
          <h2>{t("emptyWatchList")}</h2>
        </div>
      ) : (
        <div className={styles.container_list}>
          <h1>{t("watchListTitle")}</h1>
          <h4>{t("listTag")}</h4>
          <div className={styles.container_list_card}>
            {whistList?.map((movie, i) => {
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
              return (
                <div key={i} className={styles.container_list_card_item}>
                  <WhistItem key={i} active={active} movie={movie} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Whistlist;
