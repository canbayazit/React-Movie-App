import { IMovieTv } from "./movie_tv";

export interface ISimilar {
    page: number;
    results: IMovieTv[];
    total_pages: number;
    total_results: number;
}

