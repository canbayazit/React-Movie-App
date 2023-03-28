import { useEffect } from "react";
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
import Loading from "../../Loading/Loading";
import { useTranslation } from "react-i18next";
const settings: ISetting = {
  lazyLoad: "ondemand",
  dots: false,
  arrows: true,
  infinite: false,
  adaptiveHeight: false,
  speed: 600,
  initialSlide: 0,
  slidesToShow: 5.2,
  slidesToScroll: 4,
  nextArrow: <SampleNextArrow location={"home"} />,
  prevArrow: <SamplePrevArrow location={"home"} />,

  responsive: [
    {
      breakpoint: 1025,
      settings: {
        dots: false,
        arrows: false,
        infinite: false,
        adaptiveHeight: false,
        speed: 500,
        slidesToShow: 3.2,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 850,
      settings: {
        dots: false,
        arrows: false,
        infinite: false,
        adaptiveHeight: false,
        speed: 500,
        slidesToShow: 3.2,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 600,
      settings: {
        dots: false,
        arrows: false,
        infinite: false,
        adaptiveHeight: false,
        speed: 500,
        slidesToShow: 2.15,
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
  const { t, i18n } = useTranslation();
  const { data, isFetching } = useGetMovieOrTvServiceQuery({
    category: category,
    page: 1,
    id: genre.id.toString(),
    lang: i18n.language.replace("_", "-"),
  });

  useEffect(() => {
    if (data?.results.length === 0) {
      dispatch(setGenreFilterId({ genreId: genre.id, category: category }));
    }
  }, [category, dispatch, genre.id, data?.results.length]);

  return (
    <>
      {!isFetching ? (
        data?.results.length !== 0 ? (
          <div className={styles.container}>
            <div className={styles.container_button}>
              <h1>
                {genre.name} {category === "movie" ? t("movies") : t("tvShows")}
              </h1>
              <Link to={`/filter/${category}`}>
                <button>{t("viewMoreDetail")}</button>
              </Link>
            </div>
            <div className={styles.container_slider}>
              <Slider {...settings}>
                {data?.results.map((movie, i) => (
                  <div
                    className={styles.movie_card}
                    key={`${movie.id}_${i}_${genre.id}`}
                  >
                    <MovieCard
                      genreId={genre.id}
                      dataGenre={dataGenre}
                      movie={movie}
                      dataMovie={data?.results}
                      categoryType={category}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ) : null
      ) : (
        <Loading />
      )}
    </>
  );
};

export default MovieSlider;
