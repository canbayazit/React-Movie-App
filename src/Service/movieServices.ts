import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICredit } from "../Types/credit";
import { IGenres } from "../Types/genres";
import { IListMovieTvResponse, IMovieTv } from "../Types/movie_tv";
import { IMovieTVPersonDetail } from "../Types/detailPage";
import { ISimilar } from "../Types/similar";
import { IUpcomingMovies } from "../Types/upcomingMovies";
import { IVideos } from "../Types/video";
import { baseURL, clientURL } from "../Store/constant";
import { IPersonCredit } from "../Types/personCredit";
import { ISearch, ISearchMovie } from "../Types/search";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["QUERY"],  
  endpoints: (builder) => ({
    getUpcomingMoviesService: builder.query<IUpcomingMovies, { page: number; lang: string;}>({
      query: (arg) =>
        `${clientURL.upcoming}?api_key=${process.env.REACT_APP_API_KEY}&page=${arg.page}&language=${arg.lang}`,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: "QUERY" as const,
                id,
              })),
              { type: "QUERY", id: "LIST" },
            ]
          : [{ type: "QUERY", id: "LIST" }],
    }),
    getGenresService: builder.query<IGenres, string>({
      query: (lang) =>
        `${clientURL.genre}?api_key=${process.env.REACT_APP_API_KEY}&language=${lang}`,
      providesTags: (result) =>
        result
          ? [
              ...result.genres.map(({ id }) => ({
                type: "QUERY" as const,
                id,
              })),
              { type: "QUERY", id: "LIST" },
            ]
          : [{ type: "QUERY", id: "LIST" }],
    }),
    getDetailService: builder.query<
      IMovieTVPersonDetail,
      { category: string; id: string; lang:string; }
    >({
      query: (arg) =>
        `/${arg.category}/${arg.id}?api_key=${process.env.REACT_APP_API_KEY}&language=${arg.lang}`,
      providesTags: (result, error, arg) => [{ type: "QUERY", arg }],
    }),
    getMovieOrTvService: builder.query<
      IListMovieTvResponse<IMovieTv>,
      { category: string; page: number; id?: string; vote?: number; lang:string }
    >({
      query: (arg) =>
        `/discover/${arg.category}?api_key=${
          process.env.REACT_APP_API_KEY
        }&sort_by=popularity.desc&page=${arg.page}&with_genres=${
          arg.id ?? ""
        }&vote_average.gte=${arg.vote ?? ""}&language=${arg.lang}`,

      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: "QUERY" as const,
                id,
              })),
              { type: "QUERY", id: "PARTIAL-LIST" },
            ]
          : [{ type: "QUERY", id: "PARTIAL-LIST" }],
      serializeQueryArgs: ({ queryArgs }) => {
        return `${queryArgs.id}-${queryArgs.vote}-${queryArgs.category}-${queryArgs.lang}`;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        if (currentCache?.page !== newItems?.page) {
          currentCache.results = [...currentCache.results, ...newItems.results];
        }
      },
      // Refetch when the arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getSearchService: builder.query<
    ISearch<ISearchMovie>,
      { category: string; page: number; query: string; lang:string }
    >({
      query: (arg) =>
        `https://api.themoviedb.org/3/search/${arg.category}?api_key=${
          process.env.REACT_APP_API_KEY
        }&query=${arg.query}&page=${arg.page}&language=${arg.lang}`,

      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: "QUERY" as const,
                id,
              })),
              { type: "QUERY", id: "PARTIAL-LIST" },
            ]
          : [{ type: "QUERY", id: "PARTIAL-LIST" }],
          //query arg leri güncellemek için kullanılıyor
      serializeQueryArgs: ({ queryArgs }) => {        
        return `${queryArgs.query}-${queryArgs.category}-${queryArgs.lang}`;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {    
        if (newItems?.page===1) {
          currentCache.results=currentCache.results.slice(0,20);
        } else {
          if (currentCache?.page !== newItems?.page) {
            currentCache.results = [...currentCache.results, ...newItems.results];
          }
        }    
        
      },
      // Refetch when the arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getVideoService: builder.query<IVideos, { category: string; id: string;}>({
      query: (arg) =>
        `/${arg.category}/${arg.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`,
      providesTags: (result, error, arg) => [{ type: "QUERY", arg }],
    }),
    getCreditService: builder.query<ICredit, { category: string; id: string; lang:string; }>({
      query: (arg) =>
        `/${arg.category}/${arg.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=${arg.lang}`,
      providesTags: (result, error, arg) => [{ type: "QUERY", arg }],
    }),
    getPersonCreditService: builder.query<
      IPersonCredit,
      { category: string; id: string; credit: string; lang:string }
    >({
      query: (arg) =>
        `/${arg.category}/${arg.id}/${arg.credit}?api_key=${process.env.REACT_APP_API_KEY}&language=${arg.lang}`,
      providesTags: (result, error, arg) => [{ type: "QUERY", arg }],
    }),
    getSimilarMovieService: builder.query<
      ISimilar,
      { category: string; id: string; lang:string }
    >({
      query: (arg) =>
        `/${arg.category}/${arg.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=${arg.lang}`,
      providesTags: (result, error, arg) => [{ type: "QUERY", arg }],
    }),
  }),
});

export const {
  useGetMovieOrTvServiceQuery,
  useGetSearchServiceQuery,
  useGetDetailServiceQuery,
  useGetPersonCreditServiceQuery,
  useGetUpcomingMoviesServiceQuery,
  useGetGenresServiceQuery,
  useGetVideoServiceQuery,
  useGetCreditServiceQuery,
  useGetSimilarMovieServiceQuery,
} = movieApi;
