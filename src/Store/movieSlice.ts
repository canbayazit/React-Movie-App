import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGenreFilter } from "../Types/actions";
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
  upcomingMovieId: 0,
  trailer: "",
  skip: true,
  iframeTitle: "",
  loading: false,
  genreId: 0,
  iconFavoriteMovieId: [],
  iconWhistListMovieId: [],
  genreFilterId:[]
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
    setUpcomingMovieId: (state, action: PayloadAction<number>) => {
      state.upcomingMovieId = action.payload;
    },
    setFavoriteChangeIcon: (state, action: PayloadAction<number>) => {
      if (state.iconFavoriteMovieId.findIndex((i) => i === action.payload) > -1) {
        state.iconFavoriteMovieId = state.iconFavoriteMovieId.filter(
          (i) => i !== action.payload
        );
      }else{
        state.iconFavoriteMovieId.push(action.payload);

      }
    },
    setWhistListChangeIcon: (state, action: PayloadAction<number>) => {
      if (state.iconWhistListMovieId.findIndex((i) => i === action.payload) > -1) {
        state.iconWhistListMovieId = state.iconWhistListMovieId.filter(
          (i) => i !== action.payload
        );
      }else{
        state.iconWhistListMovieId.push(action.payload);

      }
    },
    setGenreFilterId: (state, action: PayloadAction<IGenreFilter>) => {
      const filterData=state.genreFilterId.filter(item=>item.buttonId===action.payload.buttonId)
      if (filterData.findIndex((i) => i.genreId === action.payload.genreId) === -1) {
            state.genreFilterId.push(action.payload)        
      }else{
        return
      }
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
  setFavoriteChangeIcon,
  setWhistListChangeIcon,
  setUpcomingMovieId,
  setGenreFilterId
} = movieSlice.actions;

export default movieSlice.reducer;
