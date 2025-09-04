import React from 'react';

export default function MovieCard({ movie, onClick }) {
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

    const posterUrl = movie.poster_path
        ? `${imageBaseUrl}${movie.poster_path}`
        : 'https://via.placeholder.com/500x750/1f2937/9ca3af?text=Nema+Slike';

    const formatDate = (dateString) => {
        if (!dateString) return 'Nepoznato';
        const date = new Date(dateString);
        return date.toLocaleDateString('ba', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatRating = (rating) => {
        return rating ? rating.toFixed(1) : 'N/A';
    };

    const truncateText = (text, maxLength = 120) => {
        if (!text) return 'Opis nije dostupan';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const getRatingColor = (rating) => {
        if (rating >= 8) return 'text-green-400';
        if (rating >= 6) return 'text-yellow-400';
        if (rating >= 4) return 'text-orange-400';
        return 'text-red-400';
    };

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('MovieCard clicked, movie ID:', movie.id);
        onClick(movie.id);
    };

    return (
        <div
            onClick={handleClick}
            className="movie-card glass-card hover:shadow-glow transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer"
        >
            <div className="relative group overflow-hidden rounded-t-[20px]">
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-80 object-cover poster-float transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {movie.vote_average > 0 && (
                    <div className="rating-badge absolute top-3 right-3 glass-card px-3 py-1 flex items-center gap-1">
                        <span className={`text-sm ${getRatingColor(movie.vote_average)}`}>⭐</span>
                        <span className="text-sm font-bold text-white">{formatRating(movie.vote_average)}</span>
                    </div>
                )}

                {movie.release_date && (
                    <div className="absolute bottom-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {new Date(movie.release_date).getFullYear()}
                    </div>
                )}
            </div>

            <div className="p-5 text-white flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-tight text-gradient">
                    {movie.title}
                </h3>

                {movie.original_title && movie.original_title !== movie.title && (
                    <p className="text-gray-400 text-sm mb-2 italic line-clamp-1">
                        "{movie.original_title}"
                    </p>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
                    <span className="text-cyan-400">📅</span>
                    <span>{formatDate(movie.release_date)}</span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {truncateText(movie.overview)}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-gray-700 text-xs text-gray-400 mt-auto">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            📊 {movie.vote_count || 0}
                        </span>
                        {movie.popularity && (
                            <span className="flex items-center gap-1">
                                🔥 {Math.round(movie.popularity)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function MovieResults({ movies, isLoading, error, onMovieClick }) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="glass-card p-8 text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <span className="text-white text-lg">Pretraživanje filmova...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="error-message max-w-md">
                    <div className="text-red-400 text-2xl mb-3">❌</div>
                    <h3 className="text-red-400 text-xl font-semibold mb-2">Greška pri pretraživanju</h3>
                    <p className="text-red-300">{error}</p>
                </div>
            </div>
        );
    }

    if (!movies || movies.length === 0) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="info-message max-w-md">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-gray-300 text-xl font-semibold mb-2">Nema rezultata</h3>
                    <p className="text-gray-400">Pokušajte sa drugim pojmom za pretraživanje</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={onMovieClick}
                />
            ))}
        </div>
    );
}