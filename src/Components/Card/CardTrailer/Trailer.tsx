import React, { useEffect } from "react";
import { shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFavorite } from "../../../Assets/svg/icons/addFavorite";
import { deleteFavorite } from "../../../Assets/svg/icons/deleteFavorite";
import { tick } from "../../../Assets/svg/icons/tick";
import { addWhistList } from "../../../Assets/svg/icons/whistList";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { clientURL, imageSize } from "../../../Store/constant";
import { setGenreId, setMovieId } from "../../../Store/movieSlice";
import { useGetVideoServiceQuery } from "../../../Service/movieServices";
import { IGenres } from "../../../Types/genres";
import { IMovieTv } from "../../../Types/movie_tv";
import styles from "./trailer.module.scss";
import {
  usePostFavoriteServiceMutation,
  usePostWatchListServiceMutation,
} from "../../../Service/firebaseServices";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
interface IProps {
  movie: IMovieTv;
  category: string;
  genreId?: number;
  dataMovie?: IMovieTv[];
  dataGenre?: IGenres;
}

const Trailer = (props: IProps) => {
  const { movie, category, genreId, dataMovie, dataGenre } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [postFavorite] = usePostFavoriteServiceMutation();
  const [postWatchList] = usePostWatchListServiceMutation();
  const uid = useAppSelector((store) => store.auth.user.uid, shallowEqual);
  const watchList = useAppSelector(
    (store) => store.movies.watchList,
    shallowEqual
  );
  const favoriteList = useAppSelector(
    (store) => store.movies.favoriteList,
    shallowEqual
  );
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

  const changeRoute = ()=>{
    dispatch(setMovieId(0));
    dispatch(setGenreId(0));
    navigate(`/detail/${category}/${movie?.id}`)
  }
  const handleClick = async (key: string) => {
    if (uid) {
      if (!dataGenre) {
        if (key === "favoriteList") {
          await postFavorite({
            uid: uid,
            id: movie?.id,
            category: category,
          });
        } else if (key === "watchList") {
          await postWatchList({
            uid: uid,
            id: movie?.id,
            category: category,
          });
        }
      } else {
        if (dataGenre!.genres.findIndex((i) => i.id === genreId) > -1) {
          if (dataMovie!.findIndex((i) => i.id === movie?.id) > -1) {
            if (key === "favoriteList") {
              await postFavorite({
                uid: uid,
                id: movie?.id,
                category: category,
              });
            } else if (key === "watchList") {
              await postWatchList({
                uid: uid,
                id: movie?.id,
                category: category,
              });
            }
          }
        }
      }
    } else {
      toast.error(t('addMovieTvError'), {
        position: "top-right",
        autoClose: 5500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(setMovieId(0));
      dispatch(setGenreId(0));
      navigate("/login", { replace: true });
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

  console.log("trailer");
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
                  {watchList?.find((i) => i.id === movie?.id)
                    ? t('removeWhistList')
                    : t('addWhistList')}
                </label>
                <span onClick={() => handleClick("watchList")}>
                  {uid
                    ? watchList?.find((i) => i.id === movie?.id)
                      ? tick()
                      : addWhistList(30)
                    : addWhistList(30)}
                </span>
              </div>
              <div className={styles.container_info_icons_buttons_favorite}>
                <label>
                  {favoriteList?.find((i) => i.id === movie?.id)
                    ? t('removeFavoriteList')
                    : t('addFavoriteList')}
                </label>
                <span onClick={() => handleClick("favoriteList")}>
                  {uid
                    ? favoriteList?.find((i) => i.id === movie?.id)
                      ? deleteFavorite()
                      : addFavorite()
                    : addFavorite()}
                </span>
              </div>
            </div>
          </div>
          <div            
            onClick={()=>changeRoute()}
            className={styles.container_info_more}
          >
            <span>{t('seeMore')}</span>
          </div>
          <div className={styles.container_info_overview}>
            <h3>
              {movie?.original_title
                ? movie?.original_title
                : movie?.original_name}
            </h3>
            <p>{movie?.overview || t('notFoundOverview')}</p>
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
