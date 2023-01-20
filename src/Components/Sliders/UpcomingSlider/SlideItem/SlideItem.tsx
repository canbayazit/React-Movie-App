import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { closeButton } from "../../../../Assets/svg/icons/closeButton";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/Hook";
import {
  clientURL,
  imageOriginal,
  imageSize,
} from "../../../../Store/constant";
import {
  useGetGenresServiceQuery,
  useGetMovieVideoServiceQuery,
} from "../../../../Store/services";
import { Result } from "../../../../Types/upcomingMovies";
import Modal from "../../../Modal/modal";
import styles from "./slideItem.module.scss";
interface IProps {
  movie: Result;
  index: number;
}

const SlideItem = (props: IProps) => {
  const { movie, index } = props;
  const [active, setActive] = useState<boolean>(false);
  const [movieId, setMovieId] = useState<number>(0);
  const genreService = useGetGenresServiceQuery();

  const movieService = useGetMovieVideoServiceQuery(movieId!, {
    skip: !movieId,
  });
  useEffect(() => {
    setActive(true);
  }, []);
  useEffect(() => {
    if (movieId === movie.id) {
      document.addEventListener("keydown", (e: KeyboardEvent) => {  
        if (e.key === "Escape") {
          const modal = document.querySelector(
            `#modal_${movieId}`
          ) as HTMLDialogElement;
          modal?.querySelector("iframe")?.setAttribute("src", "");
          setMovieId(0);
        }
      });
    }
  }, [movie.id, movieId]);

  useEffect(() => {
    const setModal = (src: string) => {
      if (!!movieId) {
        const modalDialog = document.querySelector(
          `#modal_${movieId}`
        ) as HTMLDialogElement;
        modalDialog.showModal();
        const modal = document.querySelector(`#modal_${movieId}`);
        modal?.querySelector("iframe")?.setAttribute("src", src);
      }
    };
    if (!movieService.isFetching) {
      const src =
        clientURL.youtube +
        movieService.data?.results.find((item) => item.type === "Trailer")
          ?.key +
        "?autoplay=1&modestbranding=1&autohide=1&showinfo=0&controls=0";

      setModal(src);
    }
  }, [movieId, movieService.data?.results, movieService.isFetching]);

  const handleClick = (id: number) => {
    if (movie.id === id) {
      setMovieId(id);
    }
  };

  const closeModal = () => {
    const modal = document.querySelector(
      `#modal_${movieId}`
    ) as HTMLDialogElement;
    modal.close();
    modal?.querySelector("iframe")?.setAttribute("src", "");
    setMovieId(0);
  };

  // önceki componentteki veri siliniyor 2 kere çalışıyor
  // ardından yeni componentteki veri geliyor 2 kere çalışıyor
  // toplam 4 kere çalışmış oluyor
  return (
    <>
      <div
        key={movie.id}
        className={`${styles.container_background} ${
          active ? styles.active : ""
        }`}
      >
        <img
          src={`${imageOriginal}${movie.backdrop_path}`}
          alt=""
          className={styles.container_background_image}
        />
        <div className={styles.container_info}>
          <div className={styles.container_info_overview}>
            <h1>{movie.title}</h1>
            <ul>
              {movie.genre_ids.map((id, i) => {
                const name = genreService.data?.genres.find(
                  (item) => item.id === id
                )?.name;
                return <li key={i}>{name}</li>;
              })}
            </ul>
            <p>{movie.overview}</p>
            <div className={styles.container_info_button}>
              <button>Bütün Filmler</button>
              <button onClick={() => handleClick(movie.id)}>
                Fragmanı İzle
              </button>
              <button>Detayları Gör</button>
            </div>
          </div>
          <div className={styles.container_info_image}>
            <img src={`${imageSize}${movie.poster_path}`} alt="" />
          </div>
        </div>
      </div>
      <dialog className={styles.container} id={`modal_${movieId}`}>
        <div className={styles.container_modal}>
          {movieService.data?.results.find((item) => item.type === "Trailer")
            ?.key ? (
            <iframe
              width="100%"
              height="500px"
              title={
                clientURL.youtube +
                movieService.data?.results.find(
                  (item) => item.type === "Trailer"
                )?.name
              }
            ></iframe>
          ) : (
            "Fragman Bulunamadı !"
          )}
        </div>
        <div className={styles.container_close}>
          <button onClick={() => closeModal()}>{closeButton()}</button>
        </div>
      </dialog>
      
    </>
  );
};

export default SlideItem;
