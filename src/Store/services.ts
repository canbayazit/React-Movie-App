import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICredit } from "../Types/credit";
import { IGenres } from "../Types/genres";
import { IListMovieResponse, IMovieTv} from "../Types/movie_tv";
import { IMovieTVDetail } from "../Types/movieDetail";
import { IPerson } from "../Types/person";
import { IPersonMovies } from "../Types/personMovies";
import { ISimilar } from "../Types/similar";
import { IUpcomingMovies } from "../Types/upcomingMovies";
import { IVideos } from "../Types/video";
import { baseURL, clientURL } from "./constant";

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
   
    getPersonService: builder.query<IPerson, number>({
      query: (id) =>
        `${clientURL.person}${id}?api_key=${process.env.REACT_APP_API_KEY}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
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
    getDetailService: builder.query<IMovieTVDetail,{ category: string;id: string; }>({
      query: (arg) =>
        `/${arg.category}/${arg.id}?api_key=${process.env.REACT_APP_API_KEY}`,
        providesTags: (result, error, arg) => [{ type: "Post",arg}],
    }),
    getMovieOrTvService: builder.query<IListMovieResponse<IMovieTv>,{ category: string; page:number; id: string; }>({
      query: (arg) =>
        `/discover/${arg.category}?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&page=${arg.page}&with_genres=${arg.id}`,
        providesTags: (result, error, arg) => [{ type: "Post",arg}],
    }),
    getVideoService: builder.query<IVideos,{ category: string;id: string; }>({
      query: (arg) =>
        `/${arg.category}/${arg.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`,
        providesTags: (result, error, arg) => [{ type: "Post",arg}],
    }),
    getCreditService: builder.query<ICredit,{ category: string;id: string; }>({
      query: (arg) =>
        `/${arg.category}/${arg.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`,
        providesTags: (result, error, arg) => [{ type: "Post",arg}],
    }),
    getSimilarMovieService: builder.query<ISimilar,{ category: string;id: string; }>({
      query: (arg) =>
        `/${arg.category}/${arg.id}/similar?api_key=${process.env.REACT_APP_API_KEY}`,
        providesTags: (result, error, arg) => [{ type: "Post",arg}],
    }),
  }),
});

export const {
  useGetMovieOrTvServiceQuery,
  useGetDetailServiceQuery,
  useGetPersonServiceQuery,
  useGetPersonMoviesServiceQuery,
  useGetUpcomingMoviesServiceQuery,
  useGetGenresServiceQuery,
  useGetVideoServiceQuery,
  useGetCreditServiceQuery,
  useGetSimilarMovieServiceQuery


} = movieApi;
