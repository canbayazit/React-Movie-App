import React from "react";
import { shallowEqual } from "react-redux";
import { useParams } from "react-router";
import { addFavorite } from "../../../Assets/svg/icons/addFavorite";
import { deleteFavorite } from "../../../Assets/svg/icons/deleteFavorite";
import { tick } from "../../../Assets/svg/icons/tick";
import { addWhistList } from "../../../Assets/svg/icons/whistList";
import { useAppSelector } from "../../../Hooks/Hook";
import { imageSize } from "../../../Store/constant";
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
  console.log("category,id", category, id);
  console.log("category,id", data);
  return (
    <div className={styles.container}>
      <div className={styles.container_background}>
        <img src={`${imageSize}${
              data?.backdrop_path
            }`} alt="" />
      </div>
      <div className={styles.container_detail}>
        <div className={styles.container_detail_header}>
          <h1>{data?.title}</h1>
          <h5>{data?.tagline}</h5>
        </div>
        <div className={styles.container_detail_button}>
          <button>Watch Trailer</button>
          <span>
            {iconWhistListMovieId?.find((i) => i === Number(id))
              ? tick()
              : addWhistList()}
          </span>
          <span>
            {iconFavoriteMovieId?.find((i) => i === Number(id))
              ? addFavorite()
              : deleteFavorite()}
          </span>
        </div>
        <div className={styles.container_detail_info}>
          <span>{data?.release_date.slice(0,4)}</span>
          <span>{data?.vote_average.toFixed(1)}</span>
          <span>{data?.genres.map(i=>i.name)}</span>
        </div>
        <div className={styles.container_detail_overview}>
         <p>{data?.overview}</p>
        </div>
      </div>
      <nav className={styles.container_nav}>
              <div>SUGGESTED</div>
              <div>DETAILS</div>
      </nav>
      <div className={styles.container_slider}>

      </div>
    </div>
  );
};

export default Detail;
