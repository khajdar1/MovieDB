import React, { useState } from 'react';
import Search from './komponente/Search';
import { MovieResults } from './komponente/MovieCard';
import { fetchMovie, fetchPopularMovies, fetchTopRatedMovies } from './servisi/api';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalResults, setTotalResults] = useState(0);

    const handleSearch = async (query) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchMovie(query);
            setMovies(data.results);
            setTotalResults(data.total_results);
        } catch (err) {
            setError(err.message);
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePopular = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchPopularMovies(1);
            setMovies(data.results);
            setTotalResults(data.total_results);
        } catch (e) {
            setError(e.message);
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMostRated = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchTopRatedMovies(1);
            setMovies(data.results);
            setTotalResults(data.total_results);
        } catch (e) {
            setError(e.message);
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-800">
            <div className="static-bg"></div>

            <div className="container py-8 relative z-10">
                <h1 className="text-gradient text-shadow">
                    🎬 Movie Database
                </h1>


                <div className="max-w-2xl mx-auto mb-8">
                    <Search onSearch={handleSearch} />
                </div>
                <div className="buttons">
                    <button
                        onClick={handlePopular}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
                    >
                        Prikaži popularne filmove
                    </button>
                    <button
                        onClick={handleMostRated}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
                    >
                        Prikaži najbolje ocijenjene filmove
                    </button>
                </div>
                <MovieResults
                    movies={movies}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
        </div>
    );
}

export default App;