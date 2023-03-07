import { IGenreFilter } from "./actions";
//Movie Slice
export interface IMovieSliceState {
  movieId: number;
  upcomingMovieId: number;
  genreId: number;
  genreFilterId: IGenreFilter[];
  favoriteList: IICon[];
  watchList: IICon[];
}

export interface IICon {
  id: number;
  category: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  username: string;
  email: string;
  password: string;
}

export interface IUserCollection {
  id: number;
  category: string;
  uid: string;
  key: string;
}
//Auth Slice
export interface IAuthSliceState {
  user: IUser;
}
export interface IUser {
  email: string;
  uid: string;
  displayName: string;
  photoURL: string;
}
