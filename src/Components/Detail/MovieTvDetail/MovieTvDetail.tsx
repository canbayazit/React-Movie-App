import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useParams } from "react-router";
import { addFavorite } from "../../../Assets/svg/icons/addFavorite";
import { closeButton } from "../../../Assets/svg/icons/closeButton";
import { deleteFavorite } from "../../../Assets/svg/icons/deleteFavorite";
import { play } from "../../../Assets/svg/icons/play";
import { star } from "../../../Assets/svg/icons/star";
import { tick } from "../../../Assets/svg/icons/tick";
import { addWhistList } from "../../../Assets/svg/icons/whistList";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { clientURL, imageOriginal } from "../../../Store/constant";
import {
  setFavoriteChangeIcon,
  setWhistListChangeIcon,
} from "../../../Store/movieSlice";
import { useGetDetailServiceQuery, useGetVideoServiceQuery } from "../../../Service/movieServices";
import { IMovieTVPersonDetail } from "../../../Types/detailPage";
import styles from "./movieTvDetail.module.scss";
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
  const [movieId, setMovieId] = useState<number>(0);
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
  const movieService = useGetVideoServiceQuery({
    category: category!,
    id: id!,
  }, {
    skip: !Number(id),
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
      dispatch(setFavoriteChangeIcon({id:Number(id),category:category!}));
    } else if (key === "whistList") {
      dispatch(setWhistListChangeIcon({id:Number(id),category:category!}));
    }
  };
  useEffect(() => {
    if (movieId === Number(id)) {
      document.addEventListener("keydown", (e: KeyboardEvent) => {  
        if (e.key === "Escape") {
          const modal = document.querySelector(
            `#modal_${movieId}`
          ) as HTMLDialogElement;
          modal?.querySelector("iframe")?.setAttribute("src", "");
          setMovieId(0);
        }
      });
    }
  }, [id, movieId]);

  useEffect(() => {
    const setModal = (src: string) => {
      if (!!movieId) {
        const modalDialog = document.querySelector(
          `#modal_${movieId}`
        ) as HTMLDialogElement;
        modalDialog.showModal();
        const modal = document.querySelector(`#modal_${movieId}`);
        modal?.querySelector("iframe")?.setAttribute("src", src);
      }
    };
    if (!movieService.isFetching) {
      const src =
        clientURL.youtube +
        movieService.data?.results.find((item) => item.type === "Trailer")
          ?.key +
        "?autoplay=1&modestbranding=1&autohide=1&showinfo=0&controls=0";

      setModal(src);
    }
  }, [movieId, movieService.data?.results, movieService.isFetching]);

  const handleClickTrailer = (id: number) => {    
      setMovieId(id);  
  };

  const closeModal = () => {
    const modal = document.querySelector(
      `#modal_${movieId}`
    ) as HTMLDialogElement;
    modal.close();
    modal?.querySelector("iframe")?.setAttribute("src", "");
    setMovieId(0);
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
              <button onClick={()=>handleClickTrailer(Number(id))}><span>{play()}</span>WATCH TRAILER</button>
              <div className={styles.container_detail_button_icons}>
                <div className={styles.container_detail_button_icons_whistlist}>
                  <label>
                    {iconWhistListMovieId?.find((i) => i.id === Number(id))
                      ? "İzleme Listesinden Kaldır"
                      : "İzleme Listesine Ekle"}
                  </label>
                  <span onClick={() => handleClick("whistList")}>
                    {iconWhistListMovieId?.find((i) => i.id === Number(id))
                      ? tick()
                      : addWhistList(30)}
                  </span>
                </div>
                <div className={styles.container_detail_button_icons_favorite}>
                  <label>
                    {iconFavoriteMovieId?.find((i) => i.id === Number(id))
                      ? "Favoriler Listesinden Kaldır"
                      : "Favoriler Listesine Ekle"}
                  </label>
                  <span onClick={() => handleClick("favorite")}>
                    {iconFavoriteMovieId?.find((i) => i.id === Number(id))
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
        <dialog className={styles.container_dialog} id={`modal_${movieId}`}>
        <div className={styles.container_dialog_modal}>
          {movieService.data?.results.find((item) => item.type === "Trailer")
            ?.key ? (
            <iframe
              width="100%"
              height="500px"
              title={
                clientURL.youtube +
                movieService.data?.results.find(
                  (item) => item.type === "Trailer"
                )?.name
              }
            ></iframe>
          ) : (
            "Fragman Bulunamadı !"
          )}
        </div>
        <div className={styles.container_dialog_close}>
          <button onClick={() => closeModal()}>{closeButton()}</button>
        </div>
      </dialog>
      </>
      )}
    </>
  );
};

export default MovieTvDetail;
