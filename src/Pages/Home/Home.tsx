import MovieSlide from "../../Components/Card/MovieSlide";
import SliderMovie from "../../Components/Movies/Upcoming/Slider";
import { useGetGenresServiceQuery } from "../../Store/services";
import styles from "./home.module.scss";

const Home = () => {
  const { data } = useGetGenresServiceQuery();

  console.log("genres", data);
  return (
    <div className={styles.container}>
      <SliderMovie />
      <div className={styles.container_main} id="content">
        <div className={styles.container_main_button}>
          <button>Filmler</button>
          <button>Diziler</button>
        </div>
        {data?.genres.map((genre) => (       
          <MovieSlide key={genre.id} genre={genre}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
