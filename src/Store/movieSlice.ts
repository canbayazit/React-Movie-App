import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGenreFilter } from "../Types/actions";
import { IICon, State } from "../Types/state";

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
    setFavoriteChangeIcon: (state, action: PayloadAction<IICon>) => {
      if (state.iconFavoriteMovieId.findIndex((i) => i.id === action.payload.id) > -1) {
        state.iconFavoriteMovieId = state.iconFavoriteMovieId.filter(
          (i) => i.id !== action.payload.id
        );
      }else{
        state.iconFavoriteMovieId=[...state.iconFavoriteMovieId,{id:action.payload.id,category:action.payload.category}]

      }
    },
    setWhistListChangeIcon: (state, action: PayloadAction<IICon>) => {
      if (state.iconWhistListMovieId.findIndex((i) => i.id === action.payload.id) > -1) {
        state.iconWhistListMovieId = state.iconWhistListMovieId.filter(
          (i) => i.id !== action.payload.id
        );
      }else{
        state.iconWhistListMovieId=[...state.iconWhistListMovieId,{id:action.payload.id,category:action.payload.category}]

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
