import { useEffect, useState } from "react";
import Slider from "react-slick";
import {
  useGetMoviesServiceQuery,
  useGetTvServiceQuery,
} from "../../Store/services";
import { Genre } from "../../Types/genres";
import { IMovie } from "../../Types/movie";
import { ISetting } from "../../Types/sliderTypes";
import { ITv } from "../../Types/tv";
import { SampleNextArrow, SamplePrevArrow } from "../../Utils/Functions";
import MovieCard from "./MovieCard/MovieCard";
import styles from "./movieSlide.module.scss";

const settings: ISetting = {
  className: "slider_slide",
  lazyLoad: "progressive",
  dots: true,
  arrows: true,
  infinite: true,
  adaptiveHeight: true,
  speed: 600,
  slidesToShow: 5,
  slidesToScroll: 3,
  initialSlide: 2,
  autoplay: false,
  autoplaySpeed: 6000,
  cssEase: "linear",
  pauseOnHover: true,
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
  loading:boolean
}

interface IProps {
  genre: Genre;
  id: number;
}
const MovieSlide = (props: IProps) => {
  const { genre, id } = props;
  const getMovie = useGetMoviesServiceQuery({
    category: "popularity",
    page: 1,
    id: genre.id,
  });
  const getTv = useGetTvServiceQuery({
    category: "popularity",
    page: 1,
    id: genre.id,
  });

  const dataButton: IData[] = [
    {
      buttonId: 1,
      data: getMovie.data?.results!,
      loading:getMovie.isLoading,
    },
    {
      buttonId: 2,
      data: getTv.data?.results!,
      loading:getTv.isLoading,
    },
  ];

  return (
    <>
    {
      dataButton.find((item) => item.buttonId === id)?.loading ? "loading" :
      (dataButton.find((item) => item.buttonId === id)?.data.length !== 0 ? 
        (<div className={styles.container}>
        <div className={styles.container_button}>
          <h1>{props.genre.name} Movies</h1>
          <button>Daha Fazlasını Gör</button>
        </div>
        <Slider {...settings}>
          {dataButton.find((item) => item.buttonId === id)?.data.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </Slider>
      </div>) 
      : null)
    }
  
    </>
  );
};

export default MovieSlide;
