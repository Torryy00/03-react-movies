import axios from "axios"
import type { Movie } from "../types/movie";

interface MovieHttpResponse {
    results: Movie[];
}

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const response = await axios.get<MovieHttpResponse>(
        "https://api.themoviedb.org/3/search/movie", {
        params: { query },
        headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
        },
    });
    return response.data.results;
}