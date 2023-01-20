import Slider from "react-slick";
import { useEffect, useState } from "react";
import styles from "./upcoming.module.scss";
import { ISetting } from "../../../Types/sliderTypes";
import { useGetUpcomingMoviesServiceQuery } from "../../../Store/services";
import SlideItem from "./SlideItem/SlideItem";
import More from "../../More/More";
import {
  SampleNextArrowUpcoming,
  SamplePrevArrowUpcoming,
} from "../../../Utils/Functions";
const settings: ISetting = {
  dots: false,
  lazyLoad: "progressive",
  arrows: true,
  infinite: true,
  adaptiveHeight: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 6000,
  cssEase: "linear",
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
const UpcomingSlider = () => {
  // const [page, setpage] = useState<number>(1);
  const { data, isLoading } = useGetUpcomingMoviesServiceQuery(1);

  return (
    <>
      {isLoading ? (
        "loading"
      ) : (
        <div className={styles.container}>
          <div className={styles.container_slider}>
            <Slider {...settings} className={styles.container_slider_movie}>
              {data?.results.map((movie, index) => (
                <SlideItem movie={movie} index={index} key={movie.id} />
              ))}
            </Slider>
          </div>
          <More />
        </div>
      )}
    </>
  );
};

export default UpcomingSlider;
