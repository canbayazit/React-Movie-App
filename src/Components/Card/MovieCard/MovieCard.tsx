import React, { useEffect, useRef, useState } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { imageSize } from "../../../Store/constant";
import { setGenreId, setMovieId } from "../../../Store/movieSlice";
import { IGenres } from "../../../Types/genres";
import { IMovie } from "../../../Types/movie";
import { Genre } from "../../../Types/movieDetail";
import { ITv } from "../../../Types/tv";
import Trailer from "../../Video/Trailer";
import styles from "./movie.module.scss";

interface IProps {
  movie: IMovie | ITv;
  genre: Genre;
  i: number;
  dataMovie: IMovie[] | ITv[];
  dataGenre: IGenres;
  buttonId: number;
}

const MovieCard = (props: IProps) => {
  const { genre, i, movie, dataMovie, dataGenre, buttonId } = props;
  const dispatch = useAppDispatch();

  //component 2 kere çalışır useAppSelector'dan dolayı
  //redux sayesinde hem önceki değeri hem yeni değeri karşılaştırıp fragmanı günceller.
  const statusId = useAppSelector((store) => {
    if (store.movies.genreId === genre.id) {
      if (store.movies.movieId === movie.id) {
        return store.movies.movieId;
      }
    }
  }, shallowEqual);
  const handleOnMouseOver = (genre: Genre, movie: IMovie | ITv): void => {
    if (dataGenre.genres.findIndex((i) => i.id === genre.id) > -1) {
      if (dataMovie.findIndex((i) => i.id === movie.id) > -1) {
        dispatch(setMovieId(movie.id));
        dispatch(setGenreId(genre.id));
     
      }
    }
  };

  // console.log(statusId, "GenreOrMovie", movie.id);
  // console.log("movie card", movie.id);
  // console.log("movie card",dataMovie.map(item=>item.));

  return (
    <>
      {!!statusId ? (
        <div className={styles.container_video}>
          <Trailer
            movie={movie!}
            i={i}
            buttonId={buttonId}
            genreId={genre.id}
            dataMovie={dataMovie}
            dataGenre={dataGenre}
          />
        </div>
      ) : (
        <div
          id={`rect_${movie.id}`}
          className={styles.container_image}
          // onMouseOver={() => handleOnMouseOver( movie.id,genreId)}
          onMouseEnter={() => handleOnMouseOver(genre, movie)}
        >
          <img
            src={`${imageSize}${
              movie.poster_path ? movie.poster_path : movie.backdrop_path
            }`}
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default MovieCard;
