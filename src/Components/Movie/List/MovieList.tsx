import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { imageSize } from "../../../Store/constant";
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
  nextArrow: <SampleNextArrow/>,
  prevArrow: <SamplePrevArrow/>,
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
  visible: string;
}
const navList: INavItem[] = [
  { id: 1, name: "SUGGESTED", visible: "hidden" },
  { id: 2, name: "CASTS", visible: "hidden" },
  { id: 3, name: "DETAIL", visible: "hidden" },
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
  const groupPerson = <K extends string | number | symbol,V>(array: V[], group:(person:V)=>K)=>{
    let groupPerson= array.reduce((store,person)=>{
      let key= group(person)
      if(!store[key]){
        store[key]=[]
      }
      store[key].push(person);
      return store;
    },{} as Record<K, V[]>)

    let dataArray=[];
    for (const key in groupPerson) {
      if (Object.prototype.hasOwnProperty.call(groupPerson, key)) {
        const value = groupPerson[key];
        dataArray.push({group:key,value:value})
      }
    }
    return dataArray;
  }
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
      <div className={styles.container_cast_crew}>
        <div className={styles.container_cast}>
          {credit.data?.cast.map((item) => (
            <div>
              <div>
                <img src={`${imageSize}${item.profile_path}`} alt="" />
              </div>
              <div>
                <h4>{item.original_name}</h4>
                <span>{item.character}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.container_crew}>
          {groupPerson(credit.data?.crew!,group=>group.department).map((item) => {
            return (
              <div>
                <div></div>
                <div>
                  <h4>{item.group}</h4>
                  {
                    item.value.map((person)=>(
                      <span>{person.name}</span>
                    ))
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
