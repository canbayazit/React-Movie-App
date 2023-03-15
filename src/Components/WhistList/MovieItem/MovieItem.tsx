import React, { useEffect } from "react";
import { useGetDetailServiceQuery } from "../../../Service/movieServices";
import { IICon } from "../../../Types/sliceStates";
import MovieCard from "../../Card/MovieCard/MovieCard";
import Loading from "../../Loading/Loading";
import styles from "./movieItem.module.scss";

interface IProps {
  movie: IICon;
  active: boolean;
}
const WhistItem = (props: IProps) => {
  const { movie, active } = props;
  const { data, isFetching } = useGetDetailServiceQuery({
    category: movie.category,
    id: movie.id.toString(),
  });

  return (
    <>
      {isFetching && <Loading/>}
        <div className={styles.container}>
          <MovieCard
            movie={data!}
            categoryType={movie.category}
            active={active}
          />
        </div>

    </>
  );
};

export default WhistItem;
