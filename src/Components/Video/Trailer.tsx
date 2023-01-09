import React, { useEffect } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../Hooks/Hook";
import { clientURL, imageSize } from "../../Store/constant";
import { useGetMovieVideoServiceQuery } from "../../Store/services";
import { IMovie } from "../../Types/movie";
import { ITv } from "../../Types/tv";
import { IVideos } from "../../Types/video";
import styles from "./trailer.module.scss";
interface IProps {
  movie: IMovie | ITv;
  i: number;
  // modal:Element | null ,
  // data:IVideos,
  // isLoading:boolean
}
const Trailer = (props: IProps) => {
  const { movie, i } = props;
  // 3 kere çalışıyor component
  const { data, isLoading, isFetching } = useGetMovieVideoServiceQuery(
    movie.id!,
    {
      skip: !movie.id,
    }
  );

  console.log("çağırılma sayısı");
  // console.log(data,"data");
  // console.log(data,"data"); 295 220

  useEffect(() => {
    const setModal = (src: string) => {
      console.log(src, "src");
      if (!!movie.id) {
        const modal = document.querySelector(`#modal_${movie.id}`);
        modal?.querySelector("iframe")?.setAttribute("src", src);
      }
    };
    if (!isFetching) {
      console.log(
        data?.results.find((item) => item.type === "Trailer")?.key,
        movie.id
      );
      const src =
        clientURL.youtube +
        data?.results.find((item) => item.type === "Trailer")?.key +
        "?autoplay=1";
      setModal(src);
    }
  }, [data?.results, isFetching, movie.id]);
  // const {genreId}  = useAppSelector((store) => store.movies);

  return (
    <>
      {isLoading ? (
        "loading"
      ) : (
        <div className={styles.container_modal} id={`modal_${movie.id}`}>
          {data?.results.find((item) => item.type === "Trailer")?.key ? (
            <iframe
              loading="lazy"
              width="295"
              height="220"
              title={
                clientURL.youtube +
                data?.results.find((item) => item.type === "Trailer")?.name
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
      )}
    </>
  );
};

export default Trailer;
