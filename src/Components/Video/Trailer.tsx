import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import { addFavorite } from "../../Assets/svg/icons/addFavorite";
import { deleteFavorite } from "../../Assets/svg/icons/deleteFavorite";
import { deleteWhistList } from "../../Assets/svg/icons/deleteWhistList";
import { addWhistList } from "../../Assets/svg/svg";
import { useAppDispatch, useAppSelector } from "../../Hooks/Hook";
import { clientURL, imageSize } from "../../Store/constant";
import {
  setFavoriteChangeIcon,
  setGenreId,
  setMovieId,
  setWhistListChangeIcon,
} from "../../Store/movieSlice";
import {
  useGetMovieVideoServiceQuery,
  useGetTvVideoServiceQuery,
} from "../../Store/services";
import { IGenres } from "../../Types/genres";
import { IMovie } from "../../Types/movie";
import { ITv } from "../../Types/tv";
import { IVideo, IVideos } from "../../Types/video";
import styles from "./trailer.module.scss";
interface IProps {
  movie: IMovie | ITv;
  i: number;
  buttonId: number;
  genreId: number;
  dataMovie: IMovie[] | ITv[];
  dataGenre: IGenres;
}
type typeData = IMovie | ITv;

interface IData {
  buttonId: number;
  data: IVideo[];
  loading: boolean;
  fetching: boolean;
}
interface IState {
  movieData?: IMovie;
  tvData?: ITv;
}

const Trailer = (props: IProps) => {
  const { movie, i, buttonId, genreId, dataMovie, dataGenre } = props;
  const [data, setData] = useState<IState>({});
  // const [change, setChangeIcon] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const iconFavoriteMovieId = useAppSelector((store) => {
    if (store.movies.genreId === genreId) {
      if (store.movies.movieId === movie.id) {
        return store.movies.iconFavoriteMovieId;
      }
    }
  }, shallowEqual);
  const iconWhistListMovieId = useAppSelector((store) => {
    if (store.movies.genreId === genreId) {
      if (store.movies.movieId === movie.id) {
        return store.movies.iconWhistListMovieId;
      }
    }
  }, shallowEqual);
  const getMovieVideo = useGetMovieVideoServiceQuery(movie.id!, {
    skip: !movie.id,
  });
  const getTvVideo = useGetTvVideoServiceQuery(movie.id!, {
    skip: !movie.id,
  });
  const dataButton: IData[] = [
    {
      buttonId: 1,
      data: getMovieVideo.data?.results!,
      loading: getMovieVideo.isLoading!,
      fetching: getMovieVideo.isFetching,
    },
    {
      buttonId: 2,
      data: getTvVideo.data?.results!,
      loading: getTvVideo.isLoading!,
      fetching: getTvVideo.isFetching,
    },
  ];
  function isMovie(typeDatas: typeData): typeDatas is IMovie {
    if ((typeDatas as IMovie)?.title !== undefined) {
      return true;
    }
    return false;
  }
  function isTv(typeDatas: typeData): typeDatas is ITv {
    if ((typeDatas as ITv)?.name !== undefined) {
      return true;
    }
    return false;
  }
  const typeGuard = (data: typeData) => {
    if (isMovie(data)) {
      console.log("movieTv data girdi");
      setData((prevState) => ({ ...prevState, movieData: data }));
    } else if (isTv(data)) {
      console.log("istv data girdi");
      setData((prevState) => ({ ...prevState, tvData: data }));
    }
    return;
  };

  useEffect(() => {
    typeGuard(movie);
  }, []);
  // console.log("çağırılma sayısı", movie.id);

  useEffect(() => {
    const setModal = (src: string) => {
      console.log(src, "src");
      if (!!movie.id) {
        const modal = document.querySelector(`#modal_${movie.id}`);
        modal?.querySelector("iframe")?.setAttribute("src", src);
      }
    };
    if (!dataButton.find((item) => item.buttonId === buttonId)?.fetching) {
      const src =
        clientURL.youtube +
        dataButton
          .find((item) => item.buttonId === buttonId)
          ?.data?.find((item) => item.type === "Trailer")?.key +
        "?autoplay=1&modestbranding=1&autohide=1&showinfo=0&controls=0";
      setModal(src);
    }
  }, [buttonId, getMovieVideo.isFetching, getTvVideo.isFetching, movie.id]);

  const handleOnMouseLeave = (genreId: number, movie: IMovie | ITv): void => {
    if (dataGenre.genres.findIndex((i) => i.id === genreId) > -1) {
      if (dataMovie.findIndex((i) => i.id === movie.id) > -1) {
        // dispatch(setMovieId(0));
        // dispatch(setGenreId(0));
      }
    }
  };
  const handleClick = (key: string) => {
    if (dataGenre.genres.findIndex((i) => i.id === genreId) > -1) {
      if (dataMovie.findIndex((i) => i.id === movie.id) > -1) {
        key === "favorite"
          ? dispatch(setFavoriteChangeIcon(movie.id))
          : dispatch(setWhistListChangeIcon(movie.id));
      }
    }
  };
  // let a = ObjectKeys(data, buttonId);

  // console.log(a, "aaaaaaaaa");
  // console.log(data.tvData, "tv dATAAAAAAAAAAA");
  // console.log(data.movieData, "movie DATAAAAAAAA");
  useEffect(() => {
    if (!dataButton.find((item) => item.buttonId === buttonId)?.loading) {
      let c = document.getElementById(
        `canvas_${movie.id}`
      ) as HTMLCanvasElement;
      let c2 = document.getElementById(
        `canvas_${movie.id}`
      ) as HTMLCanvasElement;
      let vote = data.movieData
        ? data.movieData.vote_average!
        : data.tvData?.vote_average!;
      let ctx = c.getContext("2d");
      let ctx2 = c2.getContext("2d");
      ctx!.beginPath();
      ctx!.lineWidth = 20;
      ctx!.arc(70, 70, 60, 0, (2 * Math.PI * vote) / 10);
      ctx!.stroke();
      ctx!.strokeStyle = "#202020";

      ctx2!.beginPath();
      ctx2!.lineWidth = 20;
      ctx2!.arc(70, 70, 60, (2 * Math.PI * vote) / 10, 0);
      ctx2!.stroke();
      ctx2!.strokeStyle =
        vote >= 7
          ? "#2f9e44"
          : vote >= 6
          ? "#e67700"
          : vote >= 5
          ? "#fab005"
          : "red";
    }
  }, [
    buttonId,
    data.movieData,
    data.tvData?.vote_average,
    dataButton,
    movie.id,
  ]);

  return (
    <>
      {dataButton.find((item) => item.buttonId === buttonId)?.loading ? (
        "loading"
      ) : (
        <div
          className={styles.container}
          onMouseLeave={() => handleOnMouseLeave(genreId, movie)}
        >
          <div className={styles.container_modal} id={`modal_${movie.id}`}>
            {dataButton
              .find((item) => item.buttonId === buttonId)
              ?.data?.find((item) => item.type === "Trailer")?.key ? (
              <iframe
                title={
                  clientURL.youtube +
                  dataButton
                    .find((item) => item.buttonId === buttonId)
                    ?.data?.find((item) => item.type === "Trailer")?.name
                }
              ></iframe>
            ) : (
              <img
                width="295"
                height="220"
                src={`${imageSize}${
                  movie.poster_path ? movie.poster_path : movie.backdrop_path
                }`}
                alt=""
              />
            )}
          </div>
          <div className={styles.container_info}>
            <div className={styles.container_info_icons}>
              <div className={styles.container_info_icons_imdb}>
                <span>
                  {data.movieData
                    ? data.movieData.vote_average!
                    : data.tvData?.vote_average!}
                </span>
                <canvas id={`canvas_${movie.id}`}></canvas>
              </div>
              <div className={styles.container_info_icons_buttons}>
                <div className={styles.container_info_icons_buttons_whistlist}>
                  <label>{iconWhistListMovieId?.find((i) => i === movie.id) ? "İzleme Listesinden Kaldır" : "İzleme Listesine Ekle"}</label>
                  <span onClick={() => handleClick("whistList")}>
                    {iconWhistListMovieId?.find((i) => i === movie.id)
                      ? deleteWhistList()
                      : addWhistList()}
                  </span>
                </div>
                <div className={styles.container_info_icons_buttons_favorite}>
                  <label>{iconFavoriteMovieId?.find((i) => i === movie.id) ? "Favoriler Listesinden Kaldır" : "Favoriler Listesine Ekle"}</label>
                  <span onClick={() => handleClick("favorite")}>
                    {iconFavoriteMovieId?.find((i) => i === movie.id)
                      ? deleteFavorite()
                      : addFavorite()}
                  </span>
                </div>
              </div>
            </div>
            <Link to="/" className={styles.container_info_more}>
              <span>See More</span>
            </Link>
            <div className={styles.container_info_overview}>
              <h3>
                {data.movieData
                  ? data.movieData.original_title
                  : data.tvData?.name}
              </h3>
              <p>
                {data.movieData
                  ? data.movieData.overview
                  : data.tvData?.overview}
              </p>
              <span>
                {data.movieData
                  ? data.movieData.release_date
                  : data.tvData?.first_air_date}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Trailer;
