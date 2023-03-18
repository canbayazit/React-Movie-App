import React, { useEffect, useState } from "react";
import {
  Formik,
  Form,
  Field,
} from "formik";
import styles from "./filterMovieTv.module.scss";
import {
  useGetGenresServiceQuery,
  useGetMovieOrTvServiceQuery,
} from "../../Service/movieServices";
import { useParams } from "react-router";
import MovieCard from "../Card/MovieCard/MovieCard";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import i18n from "../../Assets/i18n";
interface IValues {
  genre: number;
  imdb: number;
}
interface IImdb {
  id: number;
  name: string;
  value: number;
}

const FilterMovieTv = () => {
  const { category } = useParams();
  const [filter, setFilter] = useState<IValues>();
  const [page, setPage] = useState<number>(1);
  const genres = useGetGenresServiceQuery(i18n.language);
  const allMovieTv = useGetMovieOrTvServiceQuery({
    category: category!,
    page: page,
    id: filter?.genre.toString()!,
    vote: filter?.imdb,
    lang:i18n.language
  });
  const { t } = useTranslation();
  const imdb: IImdb[] = [
    { id: 1, name: t('ratingThree'), value: 3 },
    { id: 2, name: t('ratingFour'), value: 4 },
    { id: 3, name: t('ratingFive'), value: 5 },
    { id: 4, name: t('ratingSix'), value: 6 },
    { id: 5, name: t('ratingSeven'), value: 7 },
    { id: 6, name: t('ratingEight'), value: 8 },
    { id: 7, name: t('ratingNine'), value: 9 },
  ];
  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY + 20 >= document.body.offsetHeight;
      if (scrolledToBottom && !allMovieTv.isFetching) {
        setPage(page + 1);
      }
    };
    document.addEventListener("scroll", onScroll);
    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [allMovieTv.isFetching, page]);
  const initialValues: IValues = {
    genre: 0,
    imdb: 0,
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_header}>
          <h1>
            {category === "movie" ? t('filterTitleMovie'): t('filterTitleTvShow')} 
          </h1>
        </div>
        <div className={styles.container_main}>
          <div className={styles.container_main_filter}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values: IValues) => {
                console.log({ values });
                if (values.genre && values.imdb) {
                  setFilter({
                    genre: values.genre,
                    imdb: values.imdb,
                  });
                  setPage(1);
                } else {
                  toast.error(
                    `
                    You need to choose options!`,
                    {
                      position: "top-right",
                      autoClose: 5500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    }
                  );
                }
              }}
            >
              <Form className={styles.container_main_filter_form}>
                <div className={styles.container_main_filter_form_genre}>
                  <Field
                    as="select"
                    name="genre"
                    className={styles.container_main_filter_form_genre_field}
                  >
                    <option selected>{t('genre')}</option>
                    {genres?.data?.genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className={styles.container_main_filter_form_imdb}>
                  <Field
                    defaultValue={"DEFAULT"}
                    as="select"
                    name="imdb"
                    className={styles.container_main_filter_form_imdb_field}
                  >
                    <option selected value="DEFAULT">
                    {t('imdb')}
                    </option>
                    {imdb.map((item, i) => (
                      <option key={item.id} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className={styles.container_main_filter_form_button}>
                  <button type="submit">{t('searchButton')}</button>
                </div>
              </Form>
            </Formik>
          </div>
          {allMovieTv.isFetching && 
            <Loading />
          }
            <div className={styles.container_main_movie}>
              {allMovieTv.data?.results.map((movie) => (
                <div className={styles.container_main_movie_card}>
                  <MovieCard
                    movie={movie}
                    genreId={filter?.genre ?? movie.genre_ids![0]}
                    categoryType={category!}
                  />
                </div>
              ))}
            </div>
       
        </div>
      </div>
    </>
  );
};

export default FilterMovieTv;
