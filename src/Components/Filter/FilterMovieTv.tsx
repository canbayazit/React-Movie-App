import React, { useEffect, useState } from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import styles from "./filterMovieTv.module.scss";
import {
  useGetGenresServiceQuery,
  useGetMovieOrTvServiceQuery,
} from "../../Store/services";
import { useParams } from "react-router";
interface IValues {
  genre: number;
  imdb: number;
}
interface IImdb {
  name: string;
  value: number;
}
const imdb: IImdb[] = [
  { name: "3 and upper", value: 3 },
  { name: "4 and upper", value: 4 },
  { name: "5 and upper", value: 5 },
  { name: "6 and upper", value: 6 },
  { name: "7 and upper", value: 7 },
  { name: "8 and upper", value: 8 },
  { name: "9 and upper", value: 9 },
];
const FilterMovieTv = () => {
  const { category } = useParams();
  const [filter, setFilter] = useState<IValues>();
  const [page, setPage] = useState<number>(1);
  const genres = useGetGenresServiceQuery();
  console.log(filter,"filter")
  const allMovieTv = useGetMovieOrTvServiceQuery({
    category: category!,
    page: page,
    id: filter?.genre.toString()!,
    vote: filter?.imdb
  });
  console.log(allMovieTv.data,"data")
  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !allMovieTv.isFetching) {
        console.log("Fetching more data...");
        setPage((prev) => prev + 1);
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
    <div className={styles.container}>
      <div className={styles.container_filter}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: IValues) => {
            console.log({ values });
            setFilter({
              genre: values.genre,
              imdb: values.imdb,
            });
          }}
        >
          <Form className={styles.container_filter_form}>
            <div className={styles.container_filter_form_genre}>
              <Field as="select" name="genre">
                <option selected>Genre</option>
                {genres?.data?.genres.map((genre) => (
                  <option value={genre.id}>{genre.name}</option>
                ))}
              </Field>
            </div>
            <div className={styles.container_filter_form_imdb}>
              <Field as="select" name="imdb">
                <option selected>IMDB Rating</option>
                {imdb.map((item) => (
                  <option value={item.value}>{item.name}</option>
                ))}
              </Field>
            </div>
            <div className={styles.container_filter_form_button}>
              <button type="submit">Search</button>
            </div>
          </Form>
        </Formik>
      </div>
      <div></div>
    </div>
  );
};

export default FilterMovieTv;
