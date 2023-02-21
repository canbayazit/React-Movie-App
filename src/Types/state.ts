import { IGenreFilter } from "./actions";

export interface State {
  movieId: number;
  upcomingMovieId:number;
  genreId: number;
  iconFavoriteMovieId: IICon[];
  iconWhistListMovieId: IICon[];
  genreFilterId:IGenreFilter[]
}

export interface IICon{
  id:number;
  category:string;
}
