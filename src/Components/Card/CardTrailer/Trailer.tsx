import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import { addFavorite } from "../../../Assets/svg/icons/addFavorite";
import { deleteFavorite } from "../../../Assets/svg/icons/deleteFavorite";
import { tick } from "../../../Assets/svg/icons/tick";
import { addWhistList } from "../../../Assets/svg/icons/whistList";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { clientURL, imageSize } from "../../../Store/constant";
import {
  setFavoriteChangeIcon,
  setGenreId,
  setMovieId,
  setWhistListChangeIcon,
} from "../../../Store/movieSlice";
import { useGetVideoServiceQuery } from "../../../Store/services";
import { IGenres } from "../../../Types/genres";
import { IMovieTv } from "../../../Types/movie_tv";

import styles from "./trailer.module.scss";
interface IProps {
  movie: IMovieTv;
  category: string;
  genreId?: number;
  dataMovie?: IMovieTv[];
  dataGenre?: IGenres;
}

const Trailer = (props: IProps) => {
  const { movie, category, genreId, dataMovie, dataGenre } = props;
  const dispatch = useAppDispatch();
  const iconFavoriteMovieId = useAppSelector((store) => {
    if (store.movies.genreId === genreId) {
      if (store.movies.movieId === movie?.id) {
        return store.movies.iconFavoriteMovieId;
      }
    } else {
      if (store.movies.movieId === movie?.id) {
        return store.movies.iconFavoriteMovieId;
      }
    }
  }, shallowEqual);
  const iconWhistListMovieId = useAppSelector((store) => {
    if (store.movies.genreId === genreId) {
      if (store.movies.movieId === movie?.id) {
        return store.movies.iconWhistListMovieId;
      }
    } else {
      if (store.movies.movieId === movie?.id) {
        return store.movies.iconWhistListMovieId;
      }
    }
  }, shallowEqual);
  const getVideo = useGetVideoServiceQuery(
    {
      category: category!,
      id: (movie?.id).toString(),
    },
    {
      skip: !movie?.id,
    }
  );

  useEffect(() => {
    const setModal = (src: string) => {
      if (!!movie?.id) {
        const modal = document.querySelector(`#modal_${movie?.id}`);
        modal?.querySelector("iframe")?.setAttribute("src", src);
      }
    };
    if (!getVideo.isFetching) {
      const src =
        clientURL.youtube +
        getVideo.data?.results.find((item) => item.type === "Trailer")?.key +
        "?autoplay=1&modestbranding=1&autohide=1&showinfo=0&controls=0";
      setModal(src);
    }
  }, [getVideo.data?.results, getVideo.isFetching, movie?.id]);

  const handleOnMouseLeave = () => {
    dispatch(setMovieId(0));
    dispatch(setGenreId(0));
  };
  const handleClick = (key: string) => {
    if (!dataGenre) {
      key === "favorite"
        ? dispatch(
            setFavoriteChangeIcon({
              id: movie?.id,
              category: category!,
            })
          )
        : dispatch(
            setWhistListChangeIcon({
              id: movie?.id,
              category: category!,
            })
          );
    } else {
      if (dataGenre!.genres.findIndex((i) => i.id === genreId) > -1) {
        if (dataMovie!.findIndex((i) => i.id === movie?.id) > -1) {
          key === "favorite"
            ? dispatch(
                setFavoriteChangeIcon({
                  id: movie?.id,
                  category: category!,
                })
              )
            : dispatch(
                setWhistListChangeIcon({
                  id: movie?.id,
                  category: category!,
                })
              );
        }
      }
    }
  };

  useEffect(() => {
    let c2 = document.querySelector(
      `#canvas_${movie?.id}`
    ) as HTMLCanvasElement;

    let ctx = c2.getContext("2d");
    ctx!.beginPath();
    ctx!.lineWidth = 20;
    ctx!.strokeStyle =
      movie?.vote_average >= 7
        ? "#2f9e44"
        : movie?.vote_average >= 6
        ? "#e67700"
        : movie?.vote_average >= 5
        ? "#fab005"
        : "#ff0000";
    ctx!.arc(70, 70, 60, (2 * Math.PI * movie?.vote_average) / 10, 0, true);
    ctx!.stroke();
    ctx?.closePath();

    ctx!.beginPath();
    ctx!.lineWidth = 20;
    ctx!.strokeStyle = "#202020";
    ctx!.arc(70, 70, 60, 0, (2 * Math.PI * movie?.vote_average) / 10, true);
    ctx!.stroke();
    ctx?.closePath();
  }, [movie?.id, movie?.vote_average]);

  return (
    <>
      <div
        className={styles.container}
        onMouseLeave={() => handleOnMouseLeave()}
      >
        <div className={styles.container_modal} id={`modal_${movie?.id}`}>
          {getVideo.data?.results.find((item) => item.type === "Trailer")
            ?.key ? (
            getVideo.isLoading ? (
              <div>LOADING</div>
            ) : (
              <iframe
                title={
                  clientURL.youtube +
                  getVideo.data.results.find((item) => item.type === "Trailer")
                    ?.name
                }
              ></iframe>
            )
          ) : (
            <img
              width="295"
              height="220"
              src={`${imageSize}${movie?.poster_path}`}
              alt=""
            />
          )}
        </div>
        <div className={styles.container_info}>
          <div className={styles.container_info_icons}>
            <div className={styles.container_info_icons_imdb}>
              <span>{movie?.vote_average?.toFixed(1)}</span>
              <canvas id={`canvas_${movie?.id}`}></canvas>
            </div>
            <div className={styles.container_info_icons_buttons}>
              <div className={styles.container_info_icons_buttons_whistlist}>
                <label>
                  {iconWhistListMovieId?.find((i) => i.id === movie?.id)
                    ? "İzleme Listesinden Kaldır"
                    : "İzleme Listesine Ekle"}
                </label>
                <span onClick={() => handleClick("whistList")}>
                  {iconWhistListMovieId?.find((i) => i.id === movie?.id)
                    ? tick()
                    : addWhistList(30)}
                </span>
              </div>
              <div className={styles.container_info_icons_buttons_favorite}>
                <label>
                  {iconFavoriteMovieId?.find((i) => i.id === movie?.id)
                    ? "Favoriler Listesinden Kaldır"
                    : "Favoriler Listesine Ekle"}
                </label>
                <span onClick={() => handleClick("favorite")}>
                  {iconFavoriteMovieId?.find((i) => i.id === movie?.id)
                    ? deleteFavorite()
                    : addFavorite()}
                </span>
              </div>
            </div>
          </div>
          <Link
            to={`/${category}/${movie?.id}`}
            className={styles.container_info_more}
          >
            <span>See More</span>
          </Link>
          <div className={styles.container_info_overview}>
            <h3>
              {movie?.original_title
                ? movie?.original_title
                : movie?.original_name}
            </h3>
            <p>{movie?.overview}</p>
            <span>
              {movie?.release_date
                ? movie?.release_date
                : movie?.first_air_date}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trailer;
