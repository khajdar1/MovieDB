export function MovieModal({ movie, onClose }) {
    if (!movie) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4" style={{ backdropFilter: 'blur(5px)' }}>
            <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative mx-auto my-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-700 hover:text-black text-2xl font-bold z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                >
                    ✖
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Poster */}
                    {movie.poster_path && (
                        <div className="md:w-1/3 p-6">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full rounded-lg shadow-md"
                            />
                        </div>
                    )}

                    {/* Detalji */}
                    <div className="md:w-2/3 p-6">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">
                            {movie.title}
                        </h2>

                        {movie.tagline && (
                            <p className="text-lg italic text-gray-600 mb-4">
                                "{movie.tagline}"
                            </p>
                        )}

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Pregled:</h3>
                            <p className="text-gray-700 leading-relaxed">
                                {movie.overview || "Nema dostupnog opisa."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <strong className="text-gray-800">Ocjena:</strong>
                                <span className="ml-2 text-yellow-600 font-semibold">
                                    {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} ⭐
                                </span>
                            </div>

                            <div>
                                <strong className="text-gray-800">Datum izlaska:</strong>
                                <span className="ml-2">{movie.release_date || "N/A"}</span>
                            </div>

                            <div>
                                <strong className="text-gray-800">Trajanje:</strong>
                                <span className="ml-2">
                                    {movie.runtime ? `${movie.runtime} min` : "N/A"}
                                </span>
                            </div>

                            <div>
                                <strong className="text-gray-800">Broj glasova:</strong>
                                <span className="ml-2">{movie.vote_count || "N/A"}</span>
                            </div>
                        </div>

                        {movie.genres && movie.genres.length > 0 && (
                            <div className="mt-4">
                                <strong className="text-gray-800">Žanrovi:</strong>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {movie.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {movie.production_companies && movie.production_companies.length > 0 && (
                            <div className="mt-4">
                                <strong className="text-gray-800">Produkcija:</strong>
                                <div className="mt-1 text-sm text-gray-600">
                                    {movie.production_companies.map(company => company.name).join(', ')}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}