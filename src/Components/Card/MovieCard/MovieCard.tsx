import { shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { imageSize } from "../../../Store/constant";
import { setGenreId, setMovieId } from "../../../Store/movieSlice";
import { IGenres } from "../../../Types/genres";
import { IMovieTv } from "../../../Types/movie_tv";
import { IPersonCast } from "../../../Types/personCredit";
import Trailer from "../CardTrailer/Trailer";
import notFoundImage from "../../../Assets/img/notFoundImage.png";
import styles from "./movie.module.scss";

interface IProps {
  movie?: IMovieTv;
  genreId?: number;
  dataMovie?: IMovieTv[];
  dataGenre?: IGenres;
  categoryType: string;
  credit?: IPersonCast;
  active?: boolean;
}

const MovieCard = (props: IProps) => {
  const {
    genreId,
    movie,
    dataMovie,
    dataGenre,
    categoryType,
    credit,
    active,
  } = props;
  const dispatch = useAppDispatch();
  const { category } = useParams();

  //component 2 kere çalışır useAppSelector'dan dolayı
  //redux sayesinde hem önceki değeri hem yeni değeri karşılaştırıp fragmanı günceller.
  const status = useAppSelector((store) => {
    if (store.movies.genreId === genreId) {
      if (store.movies.movieId === (movie?.id || credit?.id)) {
        return store.movies.movieId;
      }
    }
  }, shallowEqual);

  const handleOnMouseOver = (genreId?: number, id?: number) => {
    if (dataGenre) {
      if (dataGenre!.genres.findIndex((i) => i.id === genreId) > -1) {
        if (dataMovie!.findIndex((i) => i.id === id) > -1) {
          dispatch(setMovieId(id!));
          dispatch(setGenreId(genreId!));
        }
      }
    } else {
      dispatch(setGenreId(genreId!));
      dispatch(setMovieId(id!));
    }
  };
  return (
    <>
      {!!status ? (
        <>
          <div
            className={
              category === "person"
                ? `${styles.container_video_person} ${
                    active ? styles.active : ""
                  }`
                : styles.container_video
            }
          >
            <Trailer
              id={movie?.id! || credit?.id!}
              poster_path={movie?.poster_path! || credit?.poster_path!}
              title={
                (movie?.original_title
                  ? movie?.original_title
                  : movie?.original_name)! || credit?.original_title!
              }
              release_date={
                (movie?.release_date
                  ? movie?.release_date!
                  : movie?.first_air_date)! ||
                (credit?.release_date!
                  ? credit?.release_date!
                  : credit?.first_air_date!)
              }
              overview={movie?.overview! || credit?.overview!}
              vote_average={movie?.vote_average! || credit?.vote_average!}
              category={categoryType}
              genreId={genreId}
              dataMovie={dataMovie}
              dataGenre={dataGenre}
            />
          </div>
        </>
      ) : (
        <div id={`rect_${movie?.id}`} className={styles.container_image}>
          <img
            onMouseEnter={() =>
              handleOnMouseOver(genreId, movie?.id || credit?.id)
            }
            src={
              movie?.poster_path || credit?.poster_path
                ? `${imageSize}${movie?.poster_path || credit?.poster_path}`
                : notFoundImage
            }
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default MovieCard;
