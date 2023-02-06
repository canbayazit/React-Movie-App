import { IGenreFilter } from "./actions";

export interface State {
  movieId: number;
  upcomingMovieId:number;
  genreId: number;
  iconFavoriteMovieId: number[];
  iconWhistListMovieId: number[];
  genreFilterId:IGenreFilter[]
}
