import { Genre, IGenres } from "./genres";
import { IMovie } from "./movie";
import { ITv } from "./tv";

export interface State {
  genreData: Genre[];
  movieData: IMovie[];
  tvData: ITv[];
  movieId: number;
  trailer: string;
  skip: boolean;
  iframeTitle: string;
  loading: boolean;
  genreId: number;
  iconFavoriteMovieId: number[];
  iconWhistListMovieId: number[];
}
