import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useGetSearchServiceQuery } from "../../Service/movieServices";
import MovieCard from "../Card/MovieCard/MovieCard";
import PersonCard from "../Card/PersonCard/PersonCard";
import Loading from "../Loading/Loading";
import styles from "./search.module.scss";
interface ICategory {
  category: string;
  name: string;
}

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { t, i18n } = useTranslation();
  const { data, isFetching } = useGetSearchServiceQuery({
    category: category!,
    page: page,
    query: searchParams.get("query") || "",
    lang: i18n.language.replace("_", "-"),
  });
  const categories: ICategory[] = [
    { category: "movie", name: t("movies") },
    { category: "tv", name: t("tvShows") },
    { category: "person", name: t("person") },
  ];
  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY + 20 >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        setPage(page + 1);
      }
    };
    document.addEventListener("scroll", onScroll);
    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [isFetching, page]);
  const handleClick = (category: string) => {
    setPage(1);
    navigate({
      pathname: `/search/${category}`,
      search: `?${createSearchParams({
        query: searchParams.get("query")!,
      })}`,
    });
  };
  return (
    <>
      {isFetching && <Loading />}
      <div className={styles.container}>
        <div className={styles.container_query}>
          <h2>
            {searchParams.get("query")
              ? `"${searchParams.get("query")}" ${t("result")}`
              : " "}
          </h2>
        </div>
        <div className={styles.container_search}>
          <div className={styles.container_search_filter}>
            <ul>
              <h3>{t("searchFilter")}</h3>
              {categories.map((item, i) => (
                <li
                  key={i}
                  className={item.category === category ? styles.active : null}
                  onClick={() => handleClick(item.category)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          {data?.results.length === 0 ? (
            <div className={styles.container_search_empty}>
              <p>{t("noQuery")}</p>
            </div>
          ) : (
            <div className={styles.container_search_result}>
              {data?.results.map((item, i) => (
                <div
                  key={i}
                  className={
                    category === "person"
                      ? styles.container_search_result_person_card
                      : styles.container_search_result_movie_card
                  }
                >
                  {category === "person" ? (
                    <PersonCard id={item.id} />
                  ) : (
                    <MovieCard movie={item} categoryType={category!} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
