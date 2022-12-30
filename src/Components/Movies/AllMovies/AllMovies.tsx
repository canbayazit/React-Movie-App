import { useState } from "react";
import { useGetGenresServiceQuery } from "../../../Store/services";
import MovieSlide from "../../Card/MovieSlide";
import styles from "./AllMovies.module.scss";

interface IButtonItem {
  id: number;
  name: string;
}
const buttonList: IButtonItem[] = [
  { id: 1, name: "Filmler" },
  { id: 2, name: "Diziler" },
];
const AllMovies = () => {
    const [id, setId] = useState<number>()
  const { data } = useGetGenresServiceQuery();
  const handleClick = (id:number) => {
    console.log("clicked",id)
    setId(id);
  };
  return (
    <div className={styles.container} id="content">
        <div className={styles.container_button}>
            {buttonList.map((item) => (
            <button className={`${id===item.id ? "active": ""}` } onClick={() => handleClick(item.id)}>{item.name}</button>
            ))}
            <div className={styles.indicator}></div>
        </div>
        <div className={styles.container_data}>
        {data?.genres.map((genre) => (
            <MovieSlide key={genre.id} genre={genre} />
        ))}
        </div>
    </div>
  );
};

export default AllMovies;
