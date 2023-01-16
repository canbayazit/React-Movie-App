import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import Slider from "react-slick";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { setGenreId, setMovieId } from "../../../Store/movieSlice";
import {
  useGetMoviesServiceQuery,
  useGetMovieVideoServiceQuery,
  useGetTvServiceQuery,
} from "../../../Store/services";
import { Genre, IGenres } from "../../../Types/genres";
import { IMovie } from "../../../Types/movie";
import { ISetting } from "../../../Types/sliderTypes";
import { ITv } from "../../../Types/tv";
import { SampleNextArrow, SamplePrevArrow } from "../../../Utils/Functions";
import Trailer from "../../Card/CardTrailer/Trailer";
import MovieCard from "../../Card/MovieCard/MovieCard";
import styles from "./movieSlide.module.scss";

const settings: ISetting = {
  className: "inner_slider",
  // centerMode: true,
  // centerPadding: "200px",
  variableWidth: false,
  lazyLoad: "progressive",
  dots: false,
  arrows: true,
  infinite: true,
  adaptiveHeight: false,
  speed: 600,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: false,
  autoplaySpeed: 6000,
  cssEase: "linear",
  pauseOnHover: false,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        dots: false,
        arrows: true,
        infinite: true,
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 835,
      settings: {
        dots: false,
        arrows: true,
        infinite: true,
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 2,
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
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
  ],
};
interface IData {
  buttonId: number;
  data: IMovie[] | ITv[];
  loading: boolean;
}

interface IProps {
  genre: Genre;
  id: number;
  dataGenre: IGenres;
}

//slide ilk 5 + 20 datadan geliyor
//+ 20 rtk queryden ( query çekince component bir daha render oluyor )
// moviecard bu yüzden 45 kere çağırılmış oluyor
const MovieSlider = (props: IProps) => {
  const { genre, id, dataGenre } = props;

  //sadece ilgili slide renderlanır öbür türlü bütün slidelar renderlanıyor.
  // componenti 2 kere render ediyor belki useMemo kullanılabilir.
  // const rect = useAppSelector((store) => {
  //   if (store.movies.genreId === genre.id) {
  //       return store.movies;
  //   }
  // }, shallowEqual);
  const getMovie = useGetMoviesServiceQuery({
    category: "popularity",
    page: 1,
    id: genre.id,
  });
  // console.log(getMovie)
  const getTv = useGetTvServiceQuery({
    category: "popularity",
    page: 1,
    id: genre.id,
  });

  const dataButton: IData[] = [
    {
      buttonId: 1,
      data: getMovie.data?.results!,
      loading: getMovie.isLoading!,
    },
    {
      buttonId: 2,
      data: getTv.data?.results!,
      loading: getTv.isLoading!,
    },
  ];

  console.log("useEffect çalıştı", genre.id);

  return (
    <>
      {!dataButton.find((item) => item.buttonId === id)?.loading ? (
        dataButton.find((item) => item.buttonId === id)?.data.length !== 0 ? (
          <div className={styles.container}>
            <div className={styles.container_button}>
              <h1>{genre.name} Movies</h1>
              <button>Daha Fazlasını Görüntüle</button>
            </div>
            <div className={styles.container_slider}>
              <Slider {...settings}>
                {dataButton
                  .find((item) => item.buttonId === id)
                  ?.data?.map((movie, i) => {
                    const dataMovie = dataButton.find(
                      (item) => item.buttonId === id
                    )?.data;
                    return (
                      <div
                        className={styles.movie_card}
                        // style={{width:330}}
                        key={`${movie.id}_${i}_${genre.id}`}
                        id={`${movie.id}_${i}_${genre.id}`}
                      >
                        <MovieCard
                          i={i}
                          genre={genre}
                          dataGenre={dataGenre}
                          movie={movie}
                          dataMovie={dataMovie!}
                          buttonId={id}
                        />
                      </div>
                    );
                  })}
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
