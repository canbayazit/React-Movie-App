import { shallowEqual } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { imageSize } from "../../../Store/constant";
import { setGenreId, setMovieId } from "../../../Store/movieSlice";
import { IGenres } from "../../../Types/genres";
import { IMovieTv } from "../../../Types/movie_tv";
import { IPersonCast } from "../../../Types/personCredit";
import Trailer from "../CardTrailer/Trailer";
import notFoundImage from "../../../Assets/img/notFoundImage.png";
import styles from "./movie.module.scss";
import { IMovieTVPersonDetail } from "../../../Types/detailPage";
import { ISearchMovie } from "../../../Types/search";
import { useMediaQuery } from "../../../Hooks/useMediaQuery";
import { bookmark } from "../../../Assets/svg/icons/bookmark";
import { star } from "../../../Assets/svg/icons/star";
import { tick } from "../../../Assets/svg/icons/tick";

interface IPropsMovie extends IMovieTv, IPersonCast {}

interface IProps {
  movie?: IPropsMovie | IMovieTVPersonDetail | ISearchMovie;
  genreId?: number;
  dataMovie?: IMovieTv[];
  dataGenre?: IGenres;
  categoryType: string;
  active?: boolean;
}

const MovieCard = (props: IProps) => {
  const { genreId, movie, dataMovie, dataGenre, categoryType, active } = props;
  const matchesTablet = useMediaQuery("(min-width: 1025px)");
  const dispatch = useAppDispatch();
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  //component 2 kere çalışır useAppSelector'dan dolayı
  //redux sayesinde hem önceki değeri hem yeni değeri karşılaştırıp fragmanı günceller.
  const status = useAppSelector((store) => {
    if (store.movies.genreId === genreId) {
      if (store.movies.movieId === movie?.id) {
        return store.movies.movieId;
      }
    }
  }, shallowEqual);
  const watchList = useAppSelector(
    (store) => store.movies.watchList,
    shallowEqual
  );
  const favoriteList = useAppSelector(
    (store) => store.movies.favoriteList,
    shallowEqual
  );
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
  const handleClickRoute = () => {
    if (!matchesTablet) {
      navigate(`/detail/${categoryType}/${movie?.id}`);
    }
  };
  return (
    <>
      {!matchesTablet ? (
        <div id={`rect_${movie?.id}`} className={styles.container_image}>
          <img
            onClick={() => handleClickRoute()}
            onMouseEnter={() => handleOnMouseOver(genreId, movie?.id)}
            src={
              movie?.poster_path
                ? `${imageSize}${movie?.poster_path}`
                : notFoundImage
            }
            alt=""
          />
          <div className={styles.container_image_mark_right}>
            {watchList?.find((i) => i.id === movie?.id) && (
              <div className={styles.container_image_mark_right_whistlist}>
                {bookmark()}
                <div
                  className={
                    styles.container_image_mark_right_whistlist_favorite
                  }
                >
                  {tick()}
                </div>
              </div>
            )}
            {favoriteList?.find((i) => i.id === movie?.id) && (
              <div className={styles.container_image_mark_right_whistlist}>
                {bookmark()}
                <div
                  className={
                    styles.container_image_mark_right_whistlist_favorite
                  }
                >
                  {star()}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : !!status ? (
        <>
          <div
            className={
              category === "person" ||
              location.pathname === "/whistlist" ||
              location.pathname === "/favorites"
                ? `${styles.container_video_other} ${
                    active ? styles.active : ""
                  }`
                : styles.container_video
            }
          >
            <Trailer
              movie={movie!}
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
            onMouseEnter={() => handleOnMouseOver(genreId, movie?.id)}
            src={
              movie?.poster_path
                ? `${imageSize}${movie?.poster_path}`
                : notFoundImage
            }
            alt=""
          />
          <div className={styles.container_image_mark_right}>
            {watchList?.find((i) => i.id === movie?.id) && (
              <div className={styles.container_image_mark_right_whistlist}>
                {bookmark()}
                <div
                  className={
                    styles.container_image_mark_right_whistlist_favorite
                  }
                >
                  {tick()}
                </div>
              </div>
            )}
            {favoriteList?.find((i) => i.id === movie?.id) && (
              <div className={styles.container_image_mark_right_whistlist}>
                {bookmark()}
                <div
                  className={
                    styles.container_image_mark_right_whistlist_favorite
                  }
                >
                  {star()}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
