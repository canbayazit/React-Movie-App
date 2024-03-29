import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { useGetSimilarMovieServiceQuery } from "../../../../Service/movieServices";
import { ISetting } from "../../../../Types/sliderTypes";
import { SampleNextArrow, SamplePrevArrow } from "../../../../Utils/Functions";
import MovieCard from "../../../Card/MovieCard/MovieCard";
import styles from "./suggested.module.scss";
const settings: ISetting = {
  lazyLoad: "ondemand",
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
const Suggested = () => {
  const { category, id } = useParams();
  const { i18n } = useTranslation();
  const { data, isLoading } = useGetSimilarMovieServiceQuery({
    category: category!,
    id: id!,
    lang:i18n.language.replace("_","-"),
  });

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className={styles.container_slider}>
          <Slider {...settings}>
            {data?.results.map((movie) => (
              <div key={movie.id} className={styles.movie_card}>
                <MovieCard
                  movie={movie}
                  categoryType={category!}
                  genreId={movie.genre_ids![0]}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Suggested;
