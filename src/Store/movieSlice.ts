import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGenreFilter } from "../Types/actions";
import { IICon, IMovieSliceState } from "../Types/sliceStates";

const initialState: IMovieSliceState = {
  movieId: 0,
  upcomingMovieId: 0,
  genreId: 0,
  genreFilterId: [],
  favoriteList: [],
  watchList: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {
    setMovieId: (state, action: PayloadAction<number>) => {
      state.movieId = action.payload;
    },
    setGenreId: (state, action: PayloadAction<number>) => {
      state.genreId = action.payload;
    },
    setUpcomingMovieId: (state, action: PayloadAction<number>) => {
      state.upcomingMovieId = action.payload;
    },
    setFavoriteList: (state, action: PayloadAction<IICon[]>) => {
      state.favoriteList = action.payload;
    },
    setWatchList: (state, action: PayloadAction<IICon[]>) => {
      state.watchList = action.payload;
    },
    setGenreFilterId: (state, action: PayloadAction<IGenreFilter>) => {
      const filterData = state.genreFilterId.filter(
        (item) => item.category === action.payload.category
      );
      if (
        filterData.findIndex((i) => i.genreId === action.payload.genreId) === -1
      ) {
        state.genreFilterId.push(action.payload);
      } else {
        return;
      }
    },
  },
});

export const {
  setMovieId,
  setGenreId,
  setUpcomingMovieId,
  setGenreFilterId,
  setFavoriteList,
  setWatchList,
} = movieSlice.actions;

export default movieSlice.reducer;
