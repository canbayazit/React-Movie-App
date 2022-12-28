import React from "react";
import { imageSize } from "../../../Store/constant";
import { IMovie } from "../../../Types/movie";
import styles from "./movie.module.scss";

interface IProps {
  movie: IMovie;
}
const MovieCard = (props: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_image}>
        <img src={`${imageSize}${props.movie.poster_path}`} alt="" />
      </div>
      <div></div>
    </div>
  );
};

export default MovieCard;
