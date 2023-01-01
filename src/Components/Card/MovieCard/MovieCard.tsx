import React from "react";
import { imageSize } from "../../../Store/constant";
import { IMovie } from "../../../Types/movie";
import { ITv } from "../../../Types/tv";
import styles from "./movie.module.scss";

interface IProps {
  movie: IMovie | ITv;
}
const MovieCard = (props: IProps) => {
  const {movie}= props
  return (
    <div className={styles.container}>
      <div className={styles.container_image}>
        <img src={`${imageSize}${movie.poster_path ? movie.poster_path : movie.backdrop_path}`} alt="" />
      </div>
      <div></div>
    </div>
  );
};

export default MovieCard;
