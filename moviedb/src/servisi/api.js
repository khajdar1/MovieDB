const BASE_URL = "https://api.themoviedb.org/3";
const REQUEST_TIMEOUT = 8000;

export async function fetchMovie(query, page = 1) {
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
        console.error('API key nije definisan u .env fajlu');
        throw new Error('API konfiguracija nije ispravna');
    }

    if (!query || query.trim().length === 0) {
        console.warn('Query parametar je prazan');
        return { results: [], total_pages: 0, total_results: 0 };
    }

    const url = `${BASE_URL}/search/movie?${new URLSearchParams({
        api_key: apiKey,
        query: query.trim(),
        language: 'ba',
        page: page.toString(),
        include_adult: 'false'
    })}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
            }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            switch (response.status) {
                case 401:
                    throw new Error('Nevalidan API ključ');
                case 404:
                    throw new Error('Endpoint nije pronađen');
                case 429:
                    throw new Error('Previše zahteva - pokušajte ponovo za nekoliko minuta');
                case 500:
                    throw new Error('Server greška - pokušajte ponovo');
                default:
                    throw new Error(`HTTP error! status: ${response.status}`);
            }
        }

        const data = await response.json();

        if (!data || typeof data !== 'object') {
            throw new Error('Nevalidan odgovor sa servera');
        }

        return {
            results: data.results || [],
            total_pages: data.total_pages || 0,
            total_results: data.total_results || 0,
            page: data.page || 1
        };

    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
            console.error('Zahtev je prekinut zbog timeout-a');
            throw new Error('Zahtev je trajan predugačko - pokušajte ponovo');
        } else {
            console.error('Fetch error:', error.message);
            throw error; 
        }
    }
}


export async function fetchPopularMovies(page = 1) {
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
        throw new Error('API konfiguracija nije ispravna');
    }

    const url = `${BASE_URL}/movie/popular?${new URLSearchParams({
        api_key: apiKey,
        language: 'ba',
        page: page.toString()
    })}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            results: data.results || [],
            total_pages: data.total_pages || 0,
            total_results: data.total_results || 0,
            page: data.page || 1
        };
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
}

export async function fetchTopRatedMovies(page = 1) {
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
        throw new Error('API konfiguracija nije ispravna');
    }

    const url = `${BASE_URL}/movie/top_rated?${new URLSearchParams({
        api_key: apiKey,
        language: 'ba',
        page: page.toString()
    })}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            results: data.results || [],
            total_pages: data.total_pages || 0,
            total_results: data.total_results || 0,
            page: data.page || 1
        };
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        throw error;
    }
}

export async function fetchMovieDetails(movieId) {
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
        throw new Error('API konfiguracija nije ispravna');
    }

    const url = `${BASE_URL}/movie/${movieId}?${new URLSearchParams({
        api_key: apiKey,
        language: 'ba',
        append_to_response: 'credits,videos,similar'
    })}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
}