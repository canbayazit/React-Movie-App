import React, { useRef, useState } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { imageSize } from "../../../Store/constant";
import { setGenreId, setMovieId, setSkip } from "../../../Store/movieSlice";
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
  // status:boolean
}
const MovieCard = (props: IProps) => {
  const { genre, i, movie, dataMovie, dataGenre } = props;
  const GenreOrMovie = useAppSelector((store) => {
    if (store.movies.genreId === genre.id) {
      if (store.movies.movieId === movie.id) {
        return { genreId: store.movies.genreId, movieId: store.movies.movieId };
      }
    }
  }, shallowEqual);
  // console.log(GenreOrMovie,"GenreOrMovie")
  // const movieId  = useAppSelector((store) =>{
  //   if (genreId===genre.id) {
  //     if (store.movies.movieId===) {

  //     }
  //     return
  //   }
  // } ,shallowEqual);
  // const videoMovie = useGetMovieVideoServiceQuery(movie.id);
  // const {movieId} = useAppSelector((store) => store.movies);
  const dispatch = useAppDispatch();
  // async function playVideo(e: React.MouseEvent<HTMLVideoElement>) {
  //   try {
  //     await e.currentTarget.play();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  const handleOnMouseOver = (
    genre: Genre,
    dataGenre: IGenres,
    movie: IMovie | ITv,
    dataMovie: IMovie[] | ITv[]
  ): void => {
    // const modal = document.querySelector(`#modal_${id}`);
    // modal?.querySelector('iframe')?.setAttribute('src',"https://www.youtube.com/embed/d9MyW72ELq0?autoplay=1");
    // dispatch(setSkip(false));
    if (dataGenre.genres.findIndex((i) => i.id === genre.id) > -1) {
      if (dataMovie.findIndex((i) => i.id === movie.id) > -1) {
        dispatch(setMovieId(movie.id));
        dispatch(setGenreId(genre.id));
      }
    }

    // dispatch(setSkip(true));
    // console.log(id,genreId)
  };
  //   const handleOnMouseOut = ( id:number): void => {
  //     const modal = document.querySelector(`#modal_${id}`);
  //     modal?.querySelector('iframe')?.setAttribute('src', '');
  //     // if(id===movie.id){
  //     //   dispatch(setSkip(true));
  //     // }
  // };
  console.log("movie card");
  return (
    <>
      {GenreOrMovie ? (
        <Trailer movie={movie!} i={i} />
      ) : (
        <div
          className={styles.container}
          // onMouseOver={() => handleOnMouseOver( movie.id,genreId)}
          onMouseOver={() =>
            handleOnMouseOver(genre, dataGenre, movie, dataMovie)
          }
        >
          <div className={styles.container_image_video}>
            <div className={styles.container_image_video_image}>
              <img
                src={`${imageSize}${
                  movie.poster_path ? movie.poster_path : movie.backdrop_path
                }`}
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
