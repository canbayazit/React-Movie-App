import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../../Hooks/Hook";
import { useGetGenresServiceQuery } from "../../../Store/services";
import MovieSlider from "../MovieSlider/MovieSlider";
import styles from "./genreSlider.module.scss";

interface IButtonItem {
  id: number;
  name: string;
  category: string;
}

const buttonList: IButtonItem[] = [
  { id: 1, name: "Filmler", category: "movie" },
  { id: 2, name: "Diziler", category: "tv" },
];

const GenreSlider = () => {
  const [category, setCategory] = useState<string>();
  const [height, setHeigh] = useState<number>();
  // state bu componentte kullanılmasa bile selector ile redux store bağlandıysak herhangi bir state
  // değiştiğinde component render olur o yüzden shallowEqual kullanıyoruz ve state tek tek alıyoruz.
  const genreFilterId = useAppSelector(
    (store) => store.movies.genreFilterId,
    shallowEqual
  );
  useEffect(() => {
    setCategory("movie");
  }, []);

  const { data, isLoading } = useGetGenresServiceQuery();
  const handleClick = (category: string) => {
    setCategory(category);
  };

  console.log(isLoading, "isLoading");
  useEffect(() => {
    if (!isLoading) {
      let elLast = document.getElementById(
        `rect_${
          data!.genres.filter(
            (item) =>
              item.id !==
              genreFilterId
                .filter((item) => item.category === category)
                .find((i) => i.genreId === item.id)?.genreId
          ).length - 2
        }`
      );
      let rectLast = window.pageYOffset + elLast?.getBoundingClientRect().top!;

      const height = rectLast!;
      setHeigh(height);
    }
  }, [data, genreFilterId, category, isLoading]);

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
                className={`${category === item.category ? "active" : ""}`}
                onClick={() => handleClick(item.category)}
              >
                {item.name}
              </button>
            ))}
            <div className={styles.indicator}></div>
          </div>
          <div className={styles.container_data} style={{ height: height }}>
            {data?.genres.length === 0 ? (
              <div>Veri Yok</div>
            ) : (
              data?.genres
                .filter(
                  (item) =>
                    item.id !==
                    genreFilterId
                      .filter((item) => item.category === category)
                      .find((i) => i.genreId === item.id)?.genreId
                )
                .map((genre, i) => {
                  return (
                    <div
                      key={genre.id}
                      id={`rect_${i}`}
                      className={styles.container_data_slider}
                      style={{ "--index": i } as React.CSSProperties}
                    >
                      <MovieSlider
                        genre={genre}
                        category={category!}
                        dataGenre={data}
                      />
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

export default GenreSlider;
