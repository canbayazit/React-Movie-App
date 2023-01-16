import AllMovies from "../../Components/Sliders/GenresSlider/GenreSlider";
import {UpcomingSlider} from "../../Components/Sliders";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <UpcomingSlider />
      <AllMovies />
    </div>
  );
};

export default Home;
