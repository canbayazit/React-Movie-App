import React from "react";
import { useParams } from "react-router-dom";
import i18n from "../../../../Assets/i18n";
import { useGetPersonCreditServiceQuery } from "../../../../Service/movieServices";
import MovieCard from "../../../Card/MovieCard/MovieCard";
import styles from "./known.module.scss";

interface IProps {
  keys: string;
  credit: string;
}
const Known = (props: IProps) => {
  const { keys, credit } = props;
  const { category, id } = useParams();
  const { data, isLoading } = useGetPersonCreditServiceQuery({
    category: category!,
    id: id!,
    credit: credit,
    lang:i18n.language.replace("_","-"),
  });

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className={styles.container}>
          {data?.cast.map((movie) => {
            const remainder = data.cast.length % 5;
            const lastItems = data.cast.slice(
              remainder === 0 ? -5 : -remainder
            );
            const active = lastItems.includes(movie) ? true : false;
            return (
              <div key={movie.id} className={styles.container_card}>
                <MovieCard
                  active={active}
                  movie={movie}
                  categoryType={keys}
                  genreId={movie.genre_ids![0]}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Known;
