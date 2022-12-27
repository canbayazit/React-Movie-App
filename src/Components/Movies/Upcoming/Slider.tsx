import Slider from "react-slick";
import { useState } from "react";
import styles from "./upcoming.module.scss";
import { arrowButtonLeft, arrowButtonRight } from "../../../Assets/svg/svg";
import { ISetting } from "../../../Types/sliderTypes";
import { useGetUpcomingMoviesServiceQuery } from "../../../Store/services";
import SlideItem from "./SlideItem/SlideItem";
import More from "../../More/More";

const SliderMovie = () => {
  const [page, setpage] = useState<number>(1);
  const getUpcomingMovieList = useGetUpcomingMoviesServiceQuery(page);

  // console.log(getUpcomingMovieList);
  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "10px",
          top: "50%",
          marginLeft: 0,
          opacity: 0.7,
          zIndex: 999,
          cursor:"Pointer",

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
          right: "10px",
          top: "50%",
          marginRight: 0,
          justifyContent: "flex-end",
          opacity: 0.7,
          cursor:"Pointer",

        }}
        onClick={onClick}
      >
        {arrowButtonRight()}
      </div>
    );
  }
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
      <div id="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione debitis, ducimus, ipsam accusantium corrupti corporis vero repudiandae soluta repellat et laboriosam harum dignissimos qui voluptates ad! Expedita deleniti illo unde.
        Eum est, necessitatibus illo, maiores, incidunt voluptatem nobis velit placeat quidem reiciendis iure dolorem? Facere nostrum assumenda ab libero eius vel! At officia debitis tempore laudantium repellat ipsum cupiditate hic!
        Doloribus perspiciatis temporibus voluptate! Quibusdam dolorem quae unde tempore dolores possimus maiores architecto dolor ipsam aspernatur. Incidunt laudantium nihil tempora dolore. Excepturi est voluptatem corrupti, architecto error ullam? Quibusdam, et.
       uatur architecto dolore facilis, iusto ducimus repellendus ipsum nulla unde laboriosam animi earum. Fugiat quis deleniti voluptatibus suscipit nihil molestiae error sunt, blanditiis quaerat!
      </div>
    </div>
  );
};

export default SliderMovie;
