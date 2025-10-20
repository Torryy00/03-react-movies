import React, { useState } from "react";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";


export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch = async (query: string) => {
        try {
            setMovies([]);
            setIsLoading(true);
            setIsError(false);
            
            const data = await fetchMovies(query);
            if (data.length === 0) {
                toast.error("No movies found for your request.")
            }
            setMovies(data);
        } catch (error) {
            console.error(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={styles.app}>
            <SearchBar onSubmit={handleSearch} />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {!isLoading && !isError && (
              <MovieGrid movies={movies} onSelect={setSelectedMovie} />
            )}
            {selectedMovie && (
              <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            )}
            <Toaster position="top-right" />
        </div> 
    );
}