import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenres } from "../Types/genres";
import { IListResponse, IMovie } from "../Types/movie";
import { IMovieDetail } from "../Types/movieDetail";
import { IPerson } from "../Types/person";
import { IPersonMovies } from "../Types/personMovies";
import { IUpcomingMovies } from "../Types/upcomingMovies";
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
    getMoviesService: builder.query<
      IListResponse<IMovie>,
      { category: string; id:number; page: number; }
    >({
      query: (arg) =>
        `${clientURL.categories}?api_key=${process.env.REACT_APP_API_KEY}&sort_by=${arg.category}.desc&with_genres=${arg.id}&page=${arg.page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" }, // bütün bir listeye sahip olmak istiyorsak id LIST tanımlamak gerek
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getMovieDetailService: builder.query<IMovieDetail, number>({
      query: (id) =>
        `${clientURL.detail} ${id}?api_key=${process.env.REACT_APP_API_KEY}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    getPersonService: builder.query<IPerson, number>({
      query: (id) =>
        `${clientURL.person} ${id}?api_key=${process.env.REACT_APP_API_KEY}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    getPersonMoviesService: builder.query<IPersonMovies, number>({
      query: (id) =>
        `${clientURL.person} ${id} ${clientURL.person_movie}?api_key=${process.env.REACT_APP_API_KEY}`,
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
  }),
});

export const {
  useGetMoviesServiceQuery,
  useGetMovieDetailServiceQuery,
  useGetPersonServiceQuery,
  useGetPersonMoviesServiceQuery,
  useGetUpcomingMoviesServiceQuery,
  useGetGenresServiceQuery,
} = movieApi;
