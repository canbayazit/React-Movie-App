import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { useGetGenresServiceQuery } from "../../../Service/movieServices";
import { setLoading } from "../../../Store/movieSlice";
import Loading from "../../Loading/Loading";
import MovieSlider from "../MovieSlider/MovieSlider";
import styles from "./genreSlider.module.scss";

interface IButtonItem {
  id: number;
  name: string;
  category: string;
}

const buttonList: IButtonItem[] = [
  { id: 1, name: "Movies", category: "movie" },
  { id: 2, name: "Tv Shows", category: "tv" },
];

const GenreSlider = () => {
  const [category, setCategory] = useState<string>("movie");
  const [height, setHeigh] = useState<number>();
  const [slice, setSlice] = useState<number>(2);
  const { data, isLoading, isFetching } = useGetGenresServiceQuery();

  // state bu componentte kullanılmasa bile selector ile redux store bağlandıysak herhangi bir state
  // değiştiğinde component render olur o yüzden shallowEqual kullanıyoruz ve state tek tek alıyoruz.
  const genreFilterId = useAppSelector(
    (store) => store.movies.genreFilterId,
    shallowEqual
  );
  useEffect(() => {
    setCategory("movie");
  }, []);
 
  const handleClick = (category: string) => {
    setCategory(category);
    setSlice(2)
  };
  useEffect(() => {
    if (!isFetching) {
      let length = data?.genres.filter(
        (item) =>
          item.id !==
          genreFilterId
            .filter((item) => item.category === category)
            .find((i) => i.genreId === item.id)?.genreId
      ).slice(0,slice).length!;
      setHeigh(310 * length);
    }
  }, [category, data?.genres, genreFilterId, isFetching, isLoading, slice]);

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY + 400 >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        setSlice(slice + 1);
      }
    };
    document.addEventListener("scroll", onScroll);
    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [isFetching, slice]);

  return (
    <>
      {isFetching ? (
        <Loading/>
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
            {data?.genres
              .filter(
                (item) =>
                  item.id !==
                  genreFilterId
                    .filter((item) => item.category === category)
                    .find((i) => i.genreId === item.id)?.genreId
              ).slice(0,slice)
              .map((genre, i) => {
                return (
                  <div
                    key={genre.id}
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
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default GenreSlider;
