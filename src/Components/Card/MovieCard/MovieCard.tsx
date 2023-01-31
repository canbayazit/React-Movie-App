import React, { useEffect, useRef, useState } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { imageSize } from "../../../Store/constant";
import { setGenreId, setMovieId } from "../../../Store/movieSlice";
import { IGenres } from "../../../Types/genres";
import { IMovie } from "../../../Types/movie";
import { Genre } from "../../../Types/movieDetail";
import { ITv } from "../../../Types/tv";
import Trailer from "../CardTrailer/Trailer";
import styles from "./movie.module.scss";

interface IProps {
  movie: IMovie | ITv ;
  genreId?: number;
  dataMovie?: IMovie[] | ITv[];
  dataGenre?: IGenres;
  category: string;
}

const MovieCard = (props: IProps) => {
  const { genreId, movie, dataMovie, dataGenre, category } = props;
  const dispatch = useAppDispatch();
  //component 2 kere çalışır useAppSelector'dan dolayı
  //redux sayesinde hem önceki değeri hem yeni değeri karşılaştırıp fragmanı günceller.
  const status = useAppSelector((store) => {
    if (store.movies.genreId === genreId) {
      if (store.movies.movieId === movie.id) {
        return store.movies.movieId;
      }
    }
  }, shallowEqual);
  console.log(status,"status")
  // console.log(genre,"genre")

  const handleOnMouseOver = (genreId?: number, movie?: IMovie | ITv)=> {
    if (dataGenre) {
      if (dataGenre!.genres.findIndex((i) => i.id === genreId) > -1) {
        if (dataMovie!.findIndex((i) => i.id === movie!.id) > -1) {
          dispatch(setMovieId(movie!.id));
          dispatch(setGenreId(genreId!));
        }
      }
    }else{
          dispatch(setGenreId(genreId!));
          dispatch(setMovieId(movie!.id));
    }
  };

  return (
    <>
      {!!status ? (
        <div className={styles.container_video}>
          <Trailer
            movie={movie!}
            category={category}
            genreId={genreId}
            dataMovie={dataMovie}
            dataGenre={dataGenre}
          />
        </div>
      ) : (
        <div
          id={`rect_${movie.id}`}
          className={styles.container_image}
          // onMouseOver={() => handleOnMouseOver( movie.id,genreId)}
          onMouseEnter={() => handleOnMouseOver(genreId,movie)}
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
