import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useParams } from "react-router";
import { addFavorite } from "../../../Assets/svg/icons/addFavorite";
import { closeButton } from "../../../Assets/svg/icons/closeButton";
import { deleteFavorite } from "../../../Assets/svg/icons/deleteFavorite";
import { star } from "../../../Assets/svg/icons/star";
import { tick } from "../../../Assets/svg/icons/tick";
import { addWhistList } from "../../../Assets/svg/icons/whistList";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { clientURL, imageOriginal } from "../../../Store/constant";
import {
  setFavoriteChangeIcon,
  setWhistListChangeIcon,
} from "../../../Store/movieSlice";
import { useGetDetailServiceQuery, useGetVideoServiceQuery } from "../../../Store/services";
import { IMovieTVPersonDetail } from "../../../Types/detailPage";
import styles from "./detail.module.scss";
interface ITagItem {
  key: string;
  name?: string;
}
interface ITag {
  movie: ITagItem[];
  tv: ITagItem[];
}
const Tag: ITag = {
  movie: [
    { key: "release_date", name: "" },
    { key: "runtime", name: "" },
  ],
  tv: [
    { key: "first_air_date", name: "" },
    { key: "number_of_seasons", name: "Seasons" },
    { key: "number_of_episodes", name: "Episodes" },
  ],
};
const MovieTvDetail = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { category, id } = useParams();
  const dispatch = useAppDispatch();
  const iconFavoriteMovieId = useAppSelector(
    (store) => store.movies.iconFavoriteMovieId,
    shallowEqual
  );
  const iconWhistListMovieId = useAppSelector(
    (store) => store.movies.iconWhistListMovieId,
    shallowEqual
  );
  const { data, isLoading } = useGetDetailServiceQuery({
    category: category!,
    id: id!,
  });
  
  const toHoursAndMinutes = (min: number) => {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position * 0.0015);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleClick = (key: string) => {
    if (key === "favorite") {
      dispatch(setFavoriteChangeIcon(Number(id)));
    } else if (key === "whistList") {
      dispatch(setWhistListChangeIcon(Number(id)));
    }
  };
  

 
  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <>
        <div className={styles.container}>
          <div
            className={styles.container_background}
            style={{ opacity: 1 - scrollPosition }}
          >
            <img src={`${imageOriginal}${data?.backdrop_path}`} alt="" />
            <div className={styles.container_background_color}></div>
          </div>
          <div className={styles.container_detail}>
            <div className={styles.container_detail_header}>
              <h1>{data?.title ? data?.title : data?.name}</h1>
              <span>{data?.tagline}</span>
            </div>
            <div className={styles.container_detail_info}>
              <div className={styles.container_detail_info_rating}>
                <span>{star()}</span>
                <span>{data?.vote_average.toFixed(1)}</span>
                <span>IMDb Rating</span>
              </div>
              <div className={styles.container_detail_info_genres}>
                <ul>
                  {Tag[category as keyof ITag].map((item, i) => (
                    <li>
                      <span>
                        {data
                          ? (item.key === "first_air_date" || item.key === "release_date")
                            ? data[
                                item.key as keyof IMovieTVPersonDetail
                              ].slice(0, 4) +
                              " " +
                              item.name
                            : item.key === "runtime"
                            ? toHoursAndMinutes(
                                data[item.key as keyof IMovieTVPersonDetail]
                              ) +
                              " " +
                              item.name
                            : data[item.key as keyof IMovieTVPersonDetail] +
                              " " +
                              item.name
                          : null}
                      </span>
                      <span>
                        {Tag[category as keyof ITag].length === i + 1
                          ? ""
                          : String.fromCharCode(8226)}
                      </span>
                    </li>
                  ))}                  
                </ul>
                <div>{data?.genres.map((i) => i.name).join(", ")}</div>
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
                  <span onClick={() => handleClick("whistList")}>
                    {iconWhistListMovieId?.find((i) => i === Number(id))
                      ? tick()
                      : addWhistList()}
                  </span>
                </div>
                <div className={styles.container_detail_button_icons_favorite}>
                  <label>
                    {iconFavoriteMovieId?.find((i) => i === Number(id))
                      ? "Favoriler Listesinden Kaldır"
                      : "Favoriler Listesine Ekle"}
                  </label>
                  <span onClick={() => handleClick("favorite")}>
                    {iconFavoriteMovieId?.find((i) => i === Number(id))
                      ? deleteFavorite()
                      : addFavorite()}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.container_detail_overview}>
              <p>{data?.overview}</p>
            </div>
          </div>
        </div>
        
      </>
      )}
    </>
  );
};

export default MovieTvDetail;
