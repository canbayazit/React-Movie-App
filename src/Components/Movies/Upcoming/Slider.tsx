import Slider from "react-slick";
import { useState } from "react";
import styles from "./upcoming.module.scss";
import { arrowButtonLeft, arrowButtonRight } from "../../../Assets/svg/svg";
import { ISetting } from "../../../Types/sliderTypes";
import { useGetUpcomingMoviesServiceQuery } from "../../../Store/services";
import SlideItem from "./SlideItem/SlideItem";

const SliderMovie = () => {
  const [page, setpage] = useState<number>(1);
  const upcomingMovieList = useGetUpcomingMoviesServiceQuery(page);
  console.log(upcomingMovieList);
  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "0",
          top: "0",
          marginLeft: 0,
          opacity: 0.7,
        }}
        onClick={onClick}
      >
        {arrowButtonLeft()}
      </div>
    );
  }
  function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "0",
          top: "0",
          marginRight: 0,
          justifyContent: "flex-end",
          opacity: 0.7,
        }}
        onClick={onClick}
      >
        {arrowButtonRight()}
      </div>
    );
  }
  const settings: ISetting = {
    dots: false,
    arrows: true,
    infinite: true,
    adaptiveHeight: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
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
  return (
    <div className={styles.container}>
      <Slider {...settings} className={styles.container_slider}>
        {upcomingMovieList.data?.results.map((movie, index) => (
         <SlideItem movie={movie} index={index}/>
        ))}
      </Slider>
    </div>
  );
};

export default SliderMovie;
