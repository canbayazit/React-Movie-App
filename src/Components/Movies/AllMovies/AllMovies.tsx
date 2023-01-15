import { useEffect, useState } from "react";
import { useGetGenresServiceQuery } from "../../../Store/services";
import MovieSlide from "../../Card/MovieSlide";
import styles from "./allMovies.module.scss";

interface IButtonItem {
  id: number;
  name: string;
}

const buttonList: IButtonItem[] = [
  { id: 1, name: "Filmler" },
  { id: 2, name: "Diziler" },
];

const AllMovies = () => {
  const [id, setId] = useState<number>(1);
  const [height, setHeigh] = useState<number>();
  // state bu componentte kullanılmasa bile selector ile redux store bağlandıysak herhangi bir state
  // değiştiğinde component render olur

  // componenti 2 kere render ediyor belki useMemo kullanılabilir.
  const { data, isLoading } = useGetGenresServiceQuery();
  const handleClick = (id: number) => {
    console.log("clicked", id);
    setId(id);
  };

  console.log(isLoading, "isLoading");
  console.log("allmovies");
useEffect(() => {
  if (!isLoading) {
    let elLast = document.getElementById(`rect_${data!.genres.length-2}`);
    let rectLast =window.pageYOffset+elLast?.getBoundingClientRect().top!

    const height = rectLast!;
    setHeigh(height);
  }

}, [data, isLoading])

  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
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
          <div className={styles.container_data}
          style={{height: height}}
          >
            {data?.genres.length === 0 ? (
              <div>Veri Yok</div>
            ) : (
              data?.genres.map((genre, i) => {
                const dataGenre = data;            
                return (
                  <div
                    key={genre.id}
                    id={`rect_${i}`}
                    className={styles.container_data_slider}
                    style={{"--index": i} as React.CSSProperties}
                  >
                    <MovieSlide genre={genre} id={id} dataGenre={dataGenre} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AllMovies;
