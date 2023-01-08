import React, { useEffect } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../Hooks/Hook";
import { clientURL } from "../../Store/constant";
import { useGetMovieVideoServiceQuery } from "../../Store/services";
import { IVideos } from "../../Types/video";
import styles from "./trailer.module.scss";
interface IProps {
  movieId?: number,
  i:number
  // modal:Element | null ,
  // data:IVideos,
  // isLoading:boolean
}
const Trailer = (props: IProps) => {
  const {movieId,i} = props;
  // 3 kere çalışıyor component
  const { data, isLoading } = useGetMovieVideoServiceQuery(movieId!,{skip:!movieId});

  console.log("çağırılma sayısı");
  // console.log(data,"data");
  // console.log(data,"data"); 295 220
  // useEffect(() => {
    
  // }, [modal])
  // const {genreId}  = useAppSelector((store) => store.movies);
  
  return (
    <>
      {isLoading ? (
        "loading"
      ) : (
        <div className={styles.container_modal} id={`modal_${movieId}`}>
          <iframe
          loading="eager"
            width="295"
            src={
              clientURL.youtube +
              data?.results.find((item) => item.type === "Trailer")?.key +
              "?autoplay=1"
            }
            // ref={iframeRef}
            height="220"
            title={
              clientURL.youtube +
              data?.results.find((item) => item.type === "Trailer")?.name
            }
          ></iframe>
        </div>
     )} 
    </>
  );
};

export default Trailer;
