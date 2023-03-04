import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useAppDispatch } from "../../../Hooks/Hook";
import { setGenreFilterId } from "../../../Store/movieSlice";
import { useGetMovieOrTvServiceQuery } from "../../../Service/movieServices";
import { Genre, IGenres } from "../../../Types/genres";
import { ISetting } from "../../../Types/sliderTypes";
import { SampleNextArrow, SamplePrevArrow } from "../../../Utils/Functions";
import MovieCard from "../../Card/MovieCard/MovieCard";
import styles from "./movieSlide.module.scss";
const settings: ISetting = {
  lazyLoad: "progressive",
  dots: false,
  arrows: true,
  infinite: false,
  adaptiveHeight: false,
  speed: 600,
  initialSlide: 0,
  slidesToShow: 5,
  slidesToScroll: 4,
  cssEase: "linear",
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,

  responsive: [
    {
      breakpoint: 835,
      settings: {
        dots: false,
        arrows: true,
        infinite: true,
        adaptiveHeight: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 480,
      settings: {
        dots: false,
        arrows: true,
        infinite: true,
        adaptiveHeight: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
  ],
};
interface IProps {
  genre: Genre;
  category: string;
  dataGenre: IGenres;
}

//slide ilk 5 + 20 datadan geliyor
//+ 20 rtk queryden ( query çekince component bir daha render oluyor )
// moviecard bu yüzden 45 kere çağırılmış oluyor
const MovieSlider = (props: IProps) => {
  const { genre, category, dataGenre } = props;
  const dispatch = useAppDispatch();
  const getMovieTv = useGetMovieOrTvServiceQuery({
    category: category,
    page: 1,
    id: genre.id.toString(),
  });

  useEffect(() => {
    if (getMovieTv.data?.results.length === 0) {
      dispatch(setGenreFilterId({ genreId: genre.id, category: category }));
    }
  }, [category, dispatch, genre.id, getMovieTv.data?.results.length]);

  return (
    <>
      {!getMovieTv.isLoading ? (
        getMovieTv.data?.results.length !== 0 ? (
          <div className={styles.container}>
            <div className={styles.container_button}>
              <h1>{genre.name} Movies</h1>
              <Link to={`/${category}`}>
                <button>Daha Fazlasını Görüntüle</button>
              </Link>
            </div>
            <div className={styles.container_slider}>
              <Slider {...settings}>
                {getMovieTv.data?.results.map((movie, i) => (
                  <div
                    className={styles.movie_card}
                    key={`${movie.id}_${i}_${genre.id}`}
                  >
                    <MovieCard
                      genreId={genre.id}
                      dataGenre={dataGenre}
                      movie={movie}
                      dataMovie={getMovieTv.data?.results}
                      categoryType={category}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ) : null
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default MovieSlider;
