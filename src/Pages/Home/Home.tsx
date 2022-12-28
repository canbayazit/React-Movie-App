import Slider from "react-slick";
import MovieCard from "../../Components/Card/MovieCard";
import SliderMovie from "../../Components/Movies/Upcoming/Slider";
import { useGetGenresServiceQuery } from "../../Store/services";
import { ISetting } from "../../Types/sliderTypes";
import { SampleNextArrow, SamplePrevArrow } from "../../Utils/Functions";
import styles from "./home.module.scss";
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
const Home = () => {
  const { data } = useGetGenresServiceQuery();
  console.log("genres", data);
  return (
    <div className={styles.container}>
      <SliderMovie />
      <div className={styles.container_main}>
        <div className={styles.container_main_button}>
          <button>Filmler</button>
          <button>Diziler</button>
        </div>
        <div className={styles.container_main_category}>
          {data?.genres.map((genre) => (
            <Slider key={genre.id} {...settings}>
              <MovieCard genre={genre} />
            </Slider>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
