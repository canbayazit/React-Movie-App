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
import { useAppSelector } from "../../../Hooks/Hook";
import { clientURL, imageOriginal } from "../../../Store/constant";
import {} from "../../../Store/movieSlice";
import {
  useGetDetailServiceQuery,
  useGetVideoServiceQuery,
} from "../../../Service/movieServices";
import { IMovieTVPersonDetail } from "../../../Types/detailPage";
import styles from "./movieTvDetail.module.scss";
import {
  usePostFavoriteServiceMutation,
  usePostWatchListServiceMutation,
} from "../../../Service/firebaseServices";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useMediaQuery } from "../../../Hooks/useMediaQuery";
interface ITagItem {
  key: string;
  name?: string;
}
interface ITag {
  movie: ITagItem[];
  tv: ITagItem[];
}

const MovieTvDetail = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [movieId, setMovieId] = useState<number>(0);
  const matchesMobile = useMediaQuery("(min-width: 601px)");
  const { category, id } = useParams();
  const { t, i18n } = useTranslation();
  const uid = useAppSelector((store) => store.auth.user.uid, shallowEqual);
  const favoriteList = useAppSelector(
    (store) => store.movies.favoriteList,
    shallowEqual
  );
  const watchList = useAppSelector(
    (store) => store.movies.watchList,
    shallowEqual
  );
  const { data, isLoading } = useGetDetailServiceQuery({
    category: category!,
    id: id!,
    lang: i18n.language.replace("_", "-"),
  });
  const movieService = useGetVideoServiceQuery(
    {
      category: category!,
      id: id!,
    },
    {
      skip: !Number(id),
    }
  );
  const [postFavorite] = usePostFavoriteServiceMutation();
  const [postWatchList] = usePostWatchListServiceMutation();
  const Tag: ITag = {
    movie: [
      { key: "release_date", name: "" },
      { key: "runtime", name: "" },
    ],
    tv: [
      { key: "first_air_date", name: "" },
      { key: "number_of_seasons", name: t("season")! },
      { key: "number_of_episodes", name: t("episode")! },
    ],
  };
  const toHoursAndMinutes = (min: number) => {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    if (i18n.language === "en_US") {
      return `${hours}h ${minutes}m`;
    }
    return `${hours}s ${minutes}dk`;
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

  const handleClick = async (key: string) => {
    if (uid) {
      if (key === "favorite") {
        await postFavorite({ uid: uid, id: Number(id), category: category! });
      } else if (key === "whistList") {
        await postWatchList({ uid: uid, id: Number(id), category: category! });
      }
    } else {
      toast.error(t("addMovieTvError"), {
        position: matchesMobile ? "top-right" : "top-center",
        autoClose: 5500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
                <h1>
                  {data?.original_title
                    ? data?.original_title
                    : data?.original_name}
                </h1>
                <span>{data?.tagline}</span>
              </div>
              <div className={styles.container_detail_info}>
                <div className={styles.container_detail_info_rating}>
                  <span>{star()}</span>
                  <span>{data?.vote_average.toFixed(1)}</span>
                  <span>{t("imdb")}</span>
                </div>
                <div className={styles.container_detail_info_genres}>
                  <ul>
                    {Tag[category as keyof ITag].map((item, i) => (
                      <li key={i}>
                        <span>
                          {data
                            ? item.key === "first_air_date" ||
                              item.key === "release_date"
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
                <button onClick={() => handleClickTrailer(Number(id))}>
                  <span>{play()}</span>
                  {t("watchTrailer").toUpperCase()}
                </button>
                <div className={styles.container_detail_button_icons}>
                  <div
                    className={styles.container_detail_button_icons_whistlist}
                  >
                    {matchesMobile && (
                      <label>
                        {watchList?.find((i) => i.id === Number(id))
                          ? t("removeWhistList")
                          : t("addWhistList")}
                      </label>
                    )}
                    <span onClick={() => handleClick("whistList")}>
                      {watchList?.find((i) => i.id === Number(id))
                        ? tick()
                        : addWhistList(30, "#fff")}
                    </span>
                  </div>
                  <div
                    className={styles.container_detail_button_icons_favorite}
                  >
                    {matchesMobile && (
                      <label>
                        {favoriteList?.find((i) => i.id === Number(id))
                          ? t("removeFavoriteList")
                          : t("addFavoriteList")}
                      </label>
                    )}
                    <span onClick={() => handleClick("favorite")}>
                      {favoriteList?.find((i) => i.id === Number(id))
                        ? deleteFavorite(25, "#ffc107")
                        : addFavorite()}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.container_detail_overview}>
                <p>{data?.overview || t("notFoundOverview")}</p>
              </div>
            </div>
          </div>
          <dialog className={styles.container_dialog} id={`modal_${movieId}`}>
            <div className={styles.container_dialog_modal}>
              {movieService.data?.results.find(
                (item) => item.type === "Trailer"
              )?.key ? (
                <iframe
                  allow="autoplay"
                  width="100%"
                  height={matchesMobile ? 500 : 300}
                  title={
                    clientURL.youtube +
                    movieService.data?.results.find(
                      (item) => item.type === "Trailer"
                    )?.name
                  }
                ></iframe>
              ) : (
                t("noTrailer")
              )}
            </div>
            <div className={styles.container_dialog_close}>
              <button onClick={() => closeModal()}>
                {closeButton(33, 2.5)}
              </button>
            </div>
          </dialog>
        </>
      )}
    </>
  );
};

export default MovieTvDetail;
