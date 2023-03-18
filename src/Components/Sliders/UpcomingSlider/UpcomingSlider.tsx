import Slider from "react-slick";
import styles from "./upcoming.module.scss";
import { ISetting } from "../../../Types/sliderTypes";
import { useGetUpcomingMoviesServiceQuery } from "../../../Service/movieServices";
import SlideItem from "./SlideItem/SlideItem";
import More from "../../More/More";
import {
  SampleNextArrowUpcoming,
  SamplePrevArrowUpcoming,
} from "../../../Utils/Functions";
import i18n from "../../../Assets/i18n";
const settings: ISetting = {
  dots: false,
  lazyLoad: "anticipated",
  arrows: true,
  infinite: true,
  adaptiveHeight: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 6000,
  pauseOnHover: true,
  nextArrow: <SampleNextArrowUpcoming />,
  prevArrow: <SamplePrevArrowUpcoming />,
  responsive: [
    {
      breakpoint: 1024,
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
    {
      breakpoint: 835,
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
const UpcomingSlider = () => {
  const { data } = useGetUpcomingMoviesServiceQuery({
    page: 1,
    lang: i18n.language.replace("_","-"),
  });
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_slider}>
          <Slider {...settings} className={styles.container_slider_movie}>
            {data?.results.map((movie, index) => (
              <div
                key={movie.id}
                className={styles.container_slider_movie_item}
              >
                <SlideItem movie={movie} index={index} />
              </div>
            ))}
          </Slider>
        </div>
        <More />
      </div>
    </>
  );
};

export default UpcomingSlider;
