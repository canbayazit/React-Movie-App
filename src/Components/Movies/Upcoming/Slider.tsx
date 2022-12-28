import Slider from "react-slick";
import { useState } from "react";
import styles from "./upcoming.module.scss";
import { ISetting } from "../../../Types/sliderTypes";
import { useGetUpcomingMoviesServiceQuery } from "../../../Store/services";
import SlideItem from "./SlideItem/SlideItem";
import More from "../../More/More";
import { SampleNextArrow, SamplePrevArrow } from "../../../Utils/Functions";
const settings: ISetting = {
  dots: true,
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
const SliderMovie = () => {
  // const [page, setpage] = useState<number>(1);
  const getUpcomingMovieList = useGetUpcomingMoviesServiceQuery(1);

  // console.log(getUpcomingMovieList);
  
 
  return (
    <div className={styles.container}>     
      <div className={styles.container_slider}>
        <Slider {...settings} className={styles.container_slider_movie}>
          {getUpcomingMovieList.data?.results.map((movie, index) => (
            <SlideItem item={movie} index={index} key={movie.id}/>
          ))}
        </Slider>
      </div>
      <More />      
    </div>
  );
};

export default SliderMovie;
