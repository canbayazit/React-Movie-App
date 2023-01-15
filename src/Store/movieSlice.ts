import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Genre } from "../Types/genres";
import { IMovie } from "../Types/movie";
import { ObjectKey, ObjectKeys } from "../Types/objectKeys";
import { IRect } from "../Types/rect";
import { State } from "../Types/state";
import { ITv } from "../Types/tv";

const initialState: State = {
  genreData: [],
  movieData: [],
  tvData: [],
  movieId: 0,
  trailer: "",
  skip: true,
  iframeTitle: "",
  loading: false,
  genreId: 0,
  iconMovieId: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {
    setMovieId: (state, action: PayloadAction<number>) => {
      state.movieId = action.payload;
    },
    setTrailerLink: (state, action: PayloadAction<string>) => {
      state.trailer = action.payload;
    },
    setSkip: (state, action: PayloadAction<boolean>) => {
      state.skip = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.iframeTitle = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setGenreId: (state, action: PayloadAction<number>) => {
      state.genreId = action.payload;
    },
    setGenre: (state, action: PayloadAction<Genre[]>) => {
      state.genreData = action.payload;
    },
    setTv: (state, action: PayloadAction<ITv[]>) => {
      state.tvData = action.payload;
    },
    setMovie: (state, action: PayloadAction<IMovie[]>) => {
      state.movieData = action.payload;
    },
    setChangeIcon: (state, action: PayloadAction<number>) => {
      if (state.iconMovieId.findIndex((i) => i === action.payload) > -1) {
        state.iconMovieId = state.iconMovieId.filter(
          (i) => i !== action.payload
        );
      }
      state.iconMovieId.push(action.payload);
    },
  },
});

export const {
  setMovieId,
  setTrailerLink,
  setSkip,
  setTitle,
  setLoading,
  setGenreId,
  setGenre,
  setTv,
  setMovie,
  setChangeIcon,
} = movieSlice.actions;

export default movieSlice.reducer;
