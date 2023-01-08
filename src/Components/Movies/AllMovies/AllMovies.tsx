import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Hooks/Hook";
import { setGenre } from "../../../Store/movieSlice";
import { useGetGenresServiceQuery } from "../../../Store/services";
import { IGenres } from "../../../Types/genres";
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
//   const [status, setStatus] = useState<boolean>(false);
//   const [datas, setData] = useState<IGenres>();
  // state bu componentte kullanılmasa bile selector ile redux store bağlandıysak herhangi bir state
  // değiştiğinde component render olur
  // const { ... } = useAppSelector((store) => store.movies);
  //   const videoMovie =useGetMovieVideoServiceQuery(movieId,{skip});

//   const { movieId, genreId } = useAppSelector((store) => store.movies);

  //   const dispatch = useAppDispatch();

  // componenti 2 kere render ediyor belki useMemo kullanılabilir.
  const { data, isLoading} = useGetGenresServiceQuery();
  const handleClick = (id: number) => {
    console.log("clicked", id);
    setId(id);
  };
  console.log(data,"data")
// if (!isLoading) {
//     if (!status) {
//         setData(data)
//        setStatus(true); 
//     }
// }
//   useEffect(() => {
//     // console.log(isFetching);

//     if (!isLoading) {
//         setStatus(true)
//     }
//   },[isLoading]);
  console.log(isLoading,"isLoading")

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
          <div className={styles.container_data}>
            {data?.genres.length === 0 ? (
              <div>Veri Yok</div>
            ) : (
              data?.genres.map((genre) => {
                const dataGenre =data
                return(<div key={genre.id}>
                    {/* {genre.id === genreId ? (
                    <MovieSlide genre={genre} id={id} movieId={movieId} selectedGenreId={genreId}  genreId={genre.id} />
                  ) :  */}
                    <MovieSlide
                      genre={genre}
                      id={id}
                      dataGenre={dataGenre}
                      // movieId={movieId}
                      // selectedGenreId={genreId}
                      // genreId={genre.id}
                    />
                    {/* } */}
                  </div>)
             })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AllMovies;
