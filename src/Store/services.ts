import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICredit } from "../Types/credit";
import { IGenres } from "../Types/genres";
import { IListMovieTvResponse, IMovieTv } from "../Types/movie_tv";
import { IMovieTVPersonDetail } from "../Types/detailPage";
import { IPersonMovies } from "../Types/personMovies";
import { ISimilar } from "../Types/similar";
import { IUpcomingMovies } from "../Types/upcomingMovies";
import { IVideos } from "../Types/video";
import { baseURL, clientURL } from "./constant";
import { IPersonCredit } from "../Types/personCredit";
import { ISearch, ISearchMovie } from "../Types/search";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["Post", "User"],
  // burda query yada mutation larda kullanacağımız tagleri tanımlıyoruz
  // sonrasında bu tagleri providesTags keyword ile kullanacağımız tag'i
  // service içine tanımlayarak sen bu tagi kullanaksın diyoruz. Peki bu tagler ne işe yarıyor ?
  // tagler query nin önbellekteki verinin tekrar fetch edilip edilmeyeceğini veya
  // verinin önbellekten kaldırılıp kaldırılmayacağını bu bu taglerden anlar algoritma.
  // providesTags : query (get) sorgusunda kullanılır
  // invalidatesTags : mutation (post,put,delete) işleminde kullanılır.
  // Bu 2 Keyword de 3 parametre alır 1. result 2. response error 3. query method (CRUD)
  // eğer query yada mutation başarılı dönerse error undefined döner, eğer error dönerse result undefined döner.

  // RTK Sorgusu, bir uç nokta için bir mutasyonun , başka bir uç noktadan bir sorgu tarafından sağlanan bazı verileri
  // geçersiz kılma niyetinde olup olmadığını belirlemek için 'etiketler' kavramını kullanır .
  endpoints: (builder) => ({
    //<result type, query type>
    getPersonMoviesService: builder.query<IPersonMovies, number>({
      query: (id) =>
        `${clientURL.person}${id}${clientURL.person_movie}?api_key=${process.env.REACT_APP_API_KEY}`,
      providesTags: (result) =>
        result
          ? [
              ...result.cast.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getUpcomingMoviesService: builder.query<IUpcomingMovies, number>({
      query: (page) =>
        `${clientURL.upcoming}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: "Post" as const,
                id,
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getGenresService: builder.query<IGenres, void>({
      query: () =>
        `${clientURL.genre}?api_key=${process.env.REACT_APP_API_KEY}`,
      providesTags: (result) =>
        result
          ? [
              ...result.genres.map(({ id }) => ({
                type: "Post" as const,
                id,
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getDetailService: builder.query<
      IMovieTVPersonDetail,
      { category: string; id: string }
    >({
      query: (arg) =>
        `/${arg.category}/${arg.id}?api_key=${process.env.REACT_APP_API_KEY}`,
      providesTags: (result, error, arg) => [{ type: "Post", arg }],
    }),
    getMovieOrTvService: builder.query<
      IListMovieTvResponse<IMovieTv>,
      { category: string; page: number; id?: string; vote?: number }
    >({
      query: (arg) =>
        `/discover/${arg.category}?api_key=${
          process.env.REACT_APP_API_KEY
        }&sort_by=popularity.desc&page=${arg.page}&with_genres=${
          arg.id ?? ""
        }&vote_average.gte=${arg.vote ?? ""}`,

      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: "Post" as const,
                id,
              })),
              { type: "Post", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Post", id: "PARTIAL-LIST" }],
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${queryArgs.id}-${queryArgs.vote}-${queryArgs.category}`;
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
      { category: string; page: number; query: string; }
    >({
      query: (arg) =>
        `https://api.themoviedb.org/3/search/${arg.category}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${arg.query}&page=${arg.page}`,

      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: "Post" as const,
                id,
              })),
              { type: "Post", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Post", id: "PARTIAL-LIST" }],
          //query arg leri güncellemek için kullanılıyor
      serializeQueryArgs: ({ endpointName, queryArgs }) => {        
        return `${queryArgs.query}-${queryArgs.category}`;
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
    getVideoService: builder.query<IVideos, { category: string; id: string }>({
      query: (arg) =>
        `/${arg.category}/${arg.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`,
      providesTags: (result, error, arg) => [{ type: "Post", arg }],
    }),
    getCreditService: builder.query<ICredit, { category: string; id: string }>({
      query: (arg) =>
        `/${arg.category}/${arg.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`,
      providesTags: (result, error, arg) => [{ type: "Post", arg }],
    }),
    getPersonCreditService: builder.query<
      IPersonCredit,
      { category: string; id: string; credit: string }
    >({
      query: (arg) =>
        `/${arg.category}/${arg.id}/${arg.credit}?api_key=${process.env.REACT_APP_API_KEY}`,
      providesTags: (result, error, arg) => [{ type: "Post", arg }],
    }),
    getSimilarMovieService: builder.query<
      ISimilar,
      { category: string; id: string }
    >({
      query: (arg) =>
        `/${arg.category}/${arg.id}/similar?api_key=${process.env.REACT_APP_API_KEY}`,
      providesTags: (result, error, arg) => [{ type: "Post", arg }],
    }),
  }),
});

export const {
  useGetMovieOrTvServiceQuery,
  useGetSearchServiceQuery,
  useGetDetailServiceQuery,
  useGetPersonCreditServiceQuery,
  useGetPersonMoviesServiceQuery,
  useGetUpcomingMoviesServiceQuery,
  useGetGenresServiceQuery,
  useGetVideoServiceQuery,
  useGetCreditServiceQuery,
  useGetSimilarMovieServiceQuery,
} = movieApi;
