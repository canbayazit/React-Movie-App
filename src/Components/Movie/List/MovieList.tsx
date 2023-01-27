import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import {
  useGetCreditServiceQuery,
  useGetSimilarMovieServiceQuery,
} from "../../../Store/services";
import { ISetting } from "../../../Types/sliderTypes";
import { SampleNextArrow, SamplePrevArrow } from "../../../Utils/Functions";
import MovieCard from "../../Card/MovieCard/MovieCard";
import styles from "./list.module.scss";
const settings: ISetting = {
  dots: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 4,
  arrows: true,
  nextArrow: <SampleNextArrow detail={true}/>,
  prevArrow: <SamplePrevArrow detail={true} />,
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
interface INavItem {
  id: number;
  name: string;
}
const navList: INavItem[] = [
  { id: 1, name: "SUGGESTED" },
  { id: 2, name: "CASTS" },
  { id: 3, name: "DETAIL" },
];
const MovieList = () => {
  const { category, id } = useParams();
  const [index, setIndex] = useState<number>(0);
  const credit = useGetCreditServiceQuery({ category: category!, id: id! });
  const similar = useGetSimilarMovieServiceQuery({
    category: category!,
    id: id!,
  });
  console.log(similar.data?.results);
  const handleClick = (i: number) => {
    setIndex(i);
  };
  return (
    <div className={styles.container}>
      <nav className={styles.container_nav}>
        {navList.map((item, i) => (
          <div
            key={item.id}
            onClick={() => handleClick(i)}
            className={
              index === i
                ? `${styles.container_nav_bar} ${styles.active}`
                : styles.container_nav_bar
            }
          >
            {item.name}
          </div>
        ))}
        <div className={styles.indicator}></div>
      </nav>
      <div className={styles.container_slider}>
        <Slider {...settings}>
          {similar.data?.results.map((movie) => (
            <div key={movie.id} className={styles.movie_card}>
              <MovieCard movie={movie} category={category!} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MovieList;
