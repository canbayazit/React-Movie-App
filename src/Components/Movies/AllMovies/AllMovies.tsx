import { useEffect, useState } from "react";
import { useGetGenresServiceQuery, useGetMoviesServiceQuery, useGetTvServiceQuery } from "../../../Store/services";
import { Genre } from "../../../Types/genres";
import MovieSlide from "../../Card/MovieSlide";
import styles from "./AllMovies.module.scss";

interface IButtonItem {
  id: number;
  name: string;}

const buttonList: IButtonItem[] = [
  { id: 1, name: "Filmler" },
  { id: 2, name: "Diziler" },
];

const AllMovies = () => {
  const [id, setId] = useState<number>(1);
  const getGenres = useGetGenresServiceQuery();
  const handleClick = (id: number) => {
    console.log("clicked", id);
    setId(id);
  };

  return (
    <div className={styles.container} id="content">
      <div className={styles.container_button}>
        {buttonList.map((item) => (
          <button
            key={item.id}
            className={`${id === item.id ? "active" : ""}`}
            onClick={() => handleClick(item.id)}
          >
            {item.name}
          </button>
        ))}
        <div className={styles.indicator}></div>
      </div>
      <div className={styles.container_data}>
        {getGenres.data?.genres.map((genre) => (
            <div key={genre.id}>
              <MovieSlide genre={genre} id={id} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default AllMovies;
