import AllMovies from "../../Components/Movies/AllMovies/AllMovies";
import SliderMovie from "../../Components/Movies/Upcoming/Slider";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <SliderMovie />
      <AllMovies />
    </div>
  );
};

export default Home;
