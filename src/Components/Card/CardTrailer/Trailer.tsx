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
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  category: string;
  genreId?: number;
  dataMovie?: IMovieTv[];
  dataGenre?: IGenres;
}

const Trailer = (props: IProps) => {
  const {
    id,
    vote_average,
    poster_path,
    title,
    overview,
    release_date,
    category,
    genreId,
    dataMovie,
    dataGenre,
  } = props;
  const dispatch = useAppDispatch();
  const iconFavoriteMovieId = useAppSelector((store) => {
    if (store.movies.genreId === genreId) {
      if (store.movies.movieId === id) {
        return store.movies.iconFavoriteMovieId;
      }
    } else {
      if (store.movies.movieId === id) {
        return store.movies.iconFavoriteMovieId;
      }
    }
  }, shallowEqual);
  const iconWhistListMovieId = useAppSelector((store) => {
    if (store.movies.genreId === genreId) {
      if (store.movies.movieId === id) {
        return store.movies.iconWhistListMovieId;
      }
    } else {
      if (store.movies.movieId === id) {
        return store.movies.iconWhistListMovieId;
      }
    }
  }, shallowEqual);
  const getVideo = useGetVideoServiceQuery(
    {
      category: category!,
      id: id.toString(),
    },
    {
      skip: !id,
    }
  );

  useEffect(() => {
    const setModal = (src: string) => {
      if (!!id) {
        const modal = document.querySelector(`#modal_${id}`);
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
  }, [getVideo.data?.results, getVideo.isFetching, id]);

  const handleOnMouseLeave = () => {
    dispatch(setMovieId(0));
    dispatch(setGenreId(0));
  };
  const handleClick = (key: string) => {
    if (!dataGenre) {
      key === "favorite"
        ? dispatch(setFavoriteChangeIcon(id))
        : dispatch(setWhistListChangeIcon(id));
    } else {
      if (dataGenre!.genres.findIndex((i) => i.id === genreId) > -1) {
        if (dataMovie!.findIndex((i) => i.id === id) > -1) {
          key === "favorite"
            ? dispatch(setFavoriteChangeIcon(id))
            : dispatch(setWhistListChangeIcon(id));
        }
      }
    }
  };

  useEffect(() => {
    let c2 = document.querySelector(`#canvas_${id}`) as HTMLCanvasElement;

    let ctx = c2.getContext("2d");
    ctx!.beginPath();
    ctx!.lineWidth = 20;
    ctx!.strokeStyle =
      vote_average >= 7
        ? "#2f9e44"
        : vote_average >= 6
        ? "#e67700"
        : vote_average >= 5
        ? "#fab005"
        : "#ff0000";
    ctx!.arc(70, 70, 60, (2 * Math.PI * vote_average) / 10, 0, true);
    ctx!.stroke();
    ctx?.closePath();

    ctx!.beginPath();
    ctx!.lineWidth = 20;
    ctx!.strokeStyle = "#202020";
    ctx!.arc(70, 70, 60, 0, (2 * Math.PI * vote_average) / 10, true);
    ctx!.stroke();
    ctx?.closePath();
  }, [id, vote_average]);

  return (
    <>
      <div
        className={styles.container}
        onMouseLeave={() => handleOnMouseLeave()}
      >
        <div className={styles.container_modal} id={`modal_${id}`}>
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
              src={`${imageSize}${poster_path}`}
              alt=""
            />
          )}
        </div>
        <div className={styles.container_info}>
          <div className={styles.container_info_icons}>
            <div className={styles.container_info_icons_imdb}>
              <span>{vote_average?.toFixed(1)}</span>
              <canvas id={`canvas_${id}`}></canvas>
            </div>
            <div className={styles.container_info_icons_buttons}>
              <div className={styles.container_info_icons_buttons_whistlist}>
                <label>
                  {iconWhistListMovieId?.find((i) => i === id)
                    ? "İzleme Listesinden Kaldır"
                    : "İzleme Listesine Ekle"}
                </label>
                <span onClick={() => handleClick("whistList")}>
                  {iconWhistListMovieId?.find((i) => i === id)
                    ? tick()
                    : addWhistList()}
                </span>
              </div>
              <div className={styles.container_info_icons_buttons_favorite}>
                <label>
                  {iconFavoriteMovieId?.find((i) => i === id)
                    ? "Favoriler Listesinden Kaldır"
                    : "Favoriler Listesine Ekle"}
                </label>
                <span onClick={() => handleClick("favorite")}>
                  {iconFavoriteMovieId?.find((i) => i === id)
                    ? deleteFavorite()
                    : addFavorite()}
                </span>
              </div>
            </div>
          </div>
          <Link
            to={`/${category}/${id}`}
            className={styles.container_info_more}
          >
            <span>See More</span>
          </Link>
          <div className={styles.container_info_overview}>
            <h3>{title}</h3>
            <p>{overview}</p>
            <span>{release_date}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trailer;
