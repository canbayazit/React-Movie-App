export interface IMovieTv extends IMovie,ITv{}

export interface ITv {
    backdrop_path: string;
    first_air_date: string;
    genre_ids?: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

export interface IMovie {
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
}

export interface IListMovieTvResponse<T>{
    page:number,
    results: T[],
    total_pages:number,
    total_results:number
}




