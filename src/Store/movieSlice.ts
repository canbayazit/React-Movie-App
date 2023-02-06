import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGenreFilter } from "../Types/actions";
import { Genre } from "../Types/genres";
import { State } from "../Types/state";

const initialState: State = {
  movieId: 0,
  upcomingMovieId: 0,
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
    setGenreId: (state, action: PayloadAction<number>) => {
      state.genreId = action.payload;
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
      const filterData=state.genreFilterId.filter(item=>item.category===action.payload.category)
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
  setGenreId,
  setFavoriteChangeIcon,
  setWhistListChangeIcon,
  setUpcomingMovieId,
  setGenreFilterId
} = movieSlice.actions;

export default movieSlice.reducer;
