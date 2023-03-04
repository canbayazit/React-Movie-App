import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { useGetSimilarMovieServiceQuery } from "../../../../Service/movieServices";
import { ISetting } from "../../../../Types/sliderTypes";
import { SampleNextArrow, SamplePrevArrow } from "../../../../Utils/Functions";
import MovieCard from "../../../Card/MovieCard/MovieCard";
import styles from "./suggested.module.scss";
const settings: ISetting = {   
    lazyLoad: "progressive",
    dots: false,
    arrows: true,
    infinite: true,
    adaptiveHeight: false,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: false,
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
const Suggested = () => {
  const { category, id } = useParams();
  const similar = useGetSimilarMovieServiceQuery({
    category: category!,
    id: id!,
  });

  return (
    <div className={styles.container}>
      {similar.isLoading ? (
        <div>Loading</div>
      ) : (
        <div className={styles.container_slider}>
          <Slider {...settings}>
            {similar.data?.results.map((movie) => (
              <div key={movie.id} className={styles.movie_card}>
                <MovieCard movie={movie} categoryType={category!} genreId={movie.genre_ids![0]}/>
              </div>
            ))}         
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Suggested;
