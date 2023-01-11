import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../Hooks/Hook";
import { clientURL, imageSize } from "../../Store/constant";
import {
  useGetMovieVideoServiceQuery, useGetTvVideoServiceQuery,

} from "../../Store/services";
import { IMovie } from "../../Types/movie";
import { ObjectKeys } from "../../Types/objectKeys";
import { ITv } from "../../Types/tv";
import { IVideo, IVideos } from "../../Types/video";
import styles from "./trailer.module.scss";
interface IProps {
  movie: IMovie | ITv;
  i: number;
  buttonId: number;
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
  const { movie, i, buttonId } = props;
  const [data, setData] = useState<IState>({});
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

  console.log("çağırılma sayısı", movie.id);

  useEffect(() => {
    const setModal = (src: string) => {
      console.log(src, "src");
      if (!!movie.id) {
        const modal = document.querySelector(`#modal_${movie.id}`);
        modal?.querySelector("iframe")?.setAttribute("src", src);
      }
    };
    if (!dataButton.find((item) => item.buttonId === buttonId)?.fetching) {
      // console.log(
      //   dataButton
      //     .find((item) => item.buttonId === buttonId)
      //     ?.data?.find((item) => item.type === "Trailer")?.key,
      //   movie.id,
      //   "asdsdasfasfasfffffffasssssssssssssssssss"
      // );
      const src =
        clientURL.youtube +
        dataButton
          .find((item) => item.buttonId === buttonId)
          ?.data?.find((item) => item.type === "Trailer")?.key +
        "?autoplay=1";
      setModal(src);
    }
  }, [buttonId, getMovieVideo.isFetching, getTvVideo.isFetching, movie.id]);
  let a = ObjectKeys(data, buttonId);


  console.log(data.tvData, "tv dATAAAAAAAAAAA");
  console.log(data.movieData, "movie DATAAAAAAAA");

  return (
    <>
      {dataButton.find((item) => item.buttonId === buttonId)?.loading ? (
        "loading"
      ) : (
        <div className={styles.container}>
          <div className={styles.container_inner}>
            <div className={styles.container_inner_modal} id={`modal_${movie.id}`}>
              {dataButton
                .find((item) => item.buttonId === buttonId)
                ?.data?.find((item) => item.type === "Trailer")?.key ? (
                <iframe
                  loading="lazy"
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
            <div className={styles.container_inner_info}>
              <div className={styles.container_info_icons}>
                <div className={styles.container_info_icons_imdb}></div>
                <div className={styles.container_info_icons_whistlist}></div>
              </div>
              <div className={styles.container_info_id}></div>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Trailer;
