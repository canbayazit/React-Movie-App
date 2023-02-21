export interface IPersonCast extends IMovieCast, ITvCast {}

export interface IPersonCrew extends IMovieCrew {}

export interface IPersonCredit {
  cast: IPersonCast[];
  crew: IPersonCrew[];
  id: number;
}

// MOVIE *******************************************

export interface IMovieCast {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character?: string;
  credit_id?: string;
  order?: number;
}

export interface IMovieCrew {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
}

// TV *******************************************

export interface ITvCast {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  character?: string;
  credit_id?: string;
  episode_count?: number;
}
