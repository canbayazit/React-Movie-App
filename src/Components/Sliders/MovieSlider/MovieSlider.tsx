import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import Slider from "react-slick";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { setGenreFilterId, setGenreId, setMovieId } from "../../../Store/movieSlice";
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
  category: string;
  data: IMovie[] | ITv[];
  loading: boolean;
}

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
  const dispatch= useAppDispatch();
  const getMovie = useGetMoviesServiceQuery({
    category: "popularity",
    page: 1,
    id: genre.id,
  },);
  const getTv = useGetTvServiceQuery({
    category: "popularity",
    page: 1,
    id: genre.id,
  });


useEffect(() => {
  const dataButtonEffect: IData[] = [
    {
      category: "movie",
      data: getMovie.data?.results!,
      loading: getMovie.isLoading!,
    },
    {
      category: "tv",
      data: getTv.data?.results!,
      loading: getTv.isLoading!,
    },
  ];
  if(dataButtonEffect
    .find((item) => item.category === category)
    ?.data?.length===0){
    dispatch(setGenreFilterId({genreId:genre.id,category:category}))
  }
}, [category])
  
  
const dataButton: IData[] = [
    {
      category: "movie",
      data: getMovie.data?.results!,
      loading: getMovie.isLoading!,
    },
    {
      category: "tv",
      data: getTv.data?.results!,
      loading: getTv.isLoading!,
    },
  ];

  return (
    <>
      {!dataButton.find((item) => item.category === category)?.loading ? (
        dataButton.find((item) => item.category === category)?.data.length !== 0 ? (
          <div className={styles.container}>
            <div className={styles.container_button}>
              <h1>{genre.name} Movies</h1>
              <button>Daha Fazlasını Görüntüle</button>
            </div>
            <div className={styles.container_slider}>
              <Slider {...settings}>
                {dataButton
                  .find((item) => item.category === category)
                  ?.data?.map((movie, i) => {
                    const dataMovie = dataButton.find(
                      (item) => item.category === category
                    )?.data;
                    return (
                      <div
                        className={styles.movie_card}
                        key={`${movie.id}_${i}_${genre.id}`}
                      >
                        <MovieCard                         
                          genreId={genre.id}
                          dataGenre={dataGenre}
                          movie={movie}
                          dataMovie={dataMovie!}
                          category={category}
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
