import Slider from "react-slick";
import { useGetMoviesServiceQuery } from "../../Store/services";
import { Genre } from "../../Types/genres";
import { ISetting } from "../../Types/sliderTypes";
import { SampleNextArrow, SamplePrevArrow } from "../../Utils/Functions";
import MovieCard from "./MovieCard/MovieCard";
import styles from "./movieSlide.module.scss";

const settings: ISetting = {
  dots: true,
  arrows: true,
  infinite: true,
  adaptiveHeight: true,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
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

interface IProps {
  genre: Genre;
}
const MovieSlide = (props: IProps) => {
  const getMovie = useGetMoviesServiceQuery({
    category: "popularity",
    page: 1,
    id: props.genre.id,
 
  });
  const getTv = useGetMoviesServiceQuery({
    category: "popularity",
    id: props.genre.id,
    page: 1,
  });
  const option = [{
    id:1,
    option:getMovie
  },
  {
    id:2,
    option:getTv
  }
]
  return (
    <div className={styles.container}>
      <h1>{props.genre.name}</h1>
      <Slider {...settings} className={styles.container_slider}>
        {getMovie.data?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Slider>
    </div>
  );
};

export default MovieSlide;
