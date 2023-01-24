import React from "react";
import { shallowEqual } from "react-redux";
import { useParams } from "react-router";
import { addFavorite } from "../../../Assets/svg/icons/addFavorite";
import { deleteFavorite } from "../../../Assets/svg/icons/deleteFavorite";
import { star } from "../../../Assets/svg/icons/star";
import { tick } from "../../../Assets/svg/icons/tick";
import { addWhistList } from "../../../Assets/svg/icons/whistList";
import { useAppSelector } from "../../../Hooks/Hook";
import { imageOriginal } from "../../../Store/constant";
import { useGetMovieDetailServiceQuery } from "../../../Store/services";
import styles from "./detail.module.scss";

const Detail = () => {
  const { category, id } = useParams();
  const iconFavoriteMovieId = useAppSelector(
    (store) => store.movies.iconFavoriteMovieId,
    shallowEqual
  );
  const iconWhistListMovieId = useAppSelector(
    (store) => store.movies.iconWhistListMovieId,
    shallowEqual
  );
  const { data } = useGetMovieDetailServiceQuery(Number(id));
  const toHoursAndMinutes = (min: number) => {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    return `${hours}h ${minutes}m`;
  };
  console.log("category,id", category, id);
  console.log("category,id", data);
  return (
    <div className={styles.container}>
      <div className={styles.container_background}>
        <img src={`${imageOriginal}${data?.backdrop_path}`} alt="" />
        <div className={styles.container_background_color}></div>
      </div>
      <div className={styles.container_detail}>
        <div className={styles.container_detail_header}>
          <h1>{data?.title}</h1>
          <span>{data?.tagline}</span>
        </div>
        <div className={styles.container_detail_info}>
          <div className={styles.container_detail_info_rating}>
            <span>{star()}</span>
            <span>{data?.vote_average.toFixed(1)}</span>
            <span>IMDb Rating</span>
          </div>
          <div className={styles.container_detail_info_genres}>
            <span>
              {data?.release_date.slice(0, 4)} &bull;{" "}
              {toHoursAndMinutes(data?.runtime!)}
            </span>
            <span>{data?.genres.map((i) => i.name).join(", ")}</span>
          </div>
        </div>
        <div className={styles.container_detail_button}>
          <button>WATCH TRAILER</button>
          <div className={styles.container_detail_button_icons}>
            <div className={styles.container_detail_button_icons_whistlist}>
              <label>
                {iconWhistListMovieId?.find((i) => i === Number(id))
                  ? "İzleme Listesinden Kaldır"
                  : "İzleme Listesine Ekle"}
              </label>
              <span>
                {iconWhistListMovieId?.find((i) => i === Number(id))
                  ? tick()
                  : addWhistList()}
              </span>
            </div>
            <div className={styles.container_detail_button_icons_favorite}>
              <label>
                {iconWhistListMovieId?.find((i) => i === Number(id))
                  ? "Favoriler Listesinden Kaldır" 
                  : "Favoriler Listesine Ekle"}
              </label>
              <span>
                {iconFavoriteMovieId?.find((i) => i === Number(id))
                  ? addFavorite()
                  : deleteFavorite()}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.container_detail_overview}>
          <p>{data?.overview}</p>
        </div>
      </div>      
    </div>
  );
};

export default Detail;
