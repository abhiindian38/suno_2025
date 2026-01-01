import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

const tmdb = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
    },
});

export interface TMDBFilters {
    primary_release_year: number;
    with_original_language?: string;
    region?: string;
    with_genres?: string;
    sort_by?: string;
    page?: number;
}

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    overview: string;
    genre_ids: number[];
    vote_average: number;
    original_language: string;
}

export interface MovieDetail extends Movie {
    runtime: number;
    genres: Array<{ id: number; name: string }>;
    budget: number;
    production_companies: Array<{
        id: number;
        name: string;
        logo_path: string | null;
        origin_country: string;
    }>;
    status: string;
}

export const tmdbAPI = {
    // Get movies from 2025 with industry filters
    getMovies: async (filters: Partial<TMDBFilters> = {}) => {
        const params = {
            primary_release_year: 2025,
            sort_by: 'popularity.desc',
            page: 1,
            ...filters,
        };

        const response = await tmdb.get('/discover/movie', { params });
        return response.data.results;
    },

    // Get movie details with credits
    getMovieDetails: async (id: number) => {
        const [movieResponse, creditsResponse] = await Promise.all([
            tmdb.get(`/movie/${id}`),
            tmdb.get(`/movie/${id}/credits`),
        ]);

        return {
            ...movieResponse.data,
            credits: creditsResponse.data,
        };
    },

    // Search movies (without year restriction for broader results)
    searchMovies: async (query: string, year?: number) => {
        const params: { query: string; year?: number } = { query };
        if (year) {
            params.year = year;
        }

        const response = await tmdb.get('/search/movie', {
            params,
        });
        return response.data.results;
    },

    // Get movies by industry (language/region)
    getMoviesByIndustry: async (industry: string, page: number = 1) => {
        const industries: Record<string, { language: string; region?: string }> = {
            bollywood: { language: 'hi', region: 'IN' },
            tollywood: { language: 'te', region: 'IN' },
            kollywood: { language: 'ta', region: 'IN' },
            sandalwood: { language: 'kn', region: 'IN' },
            hollywood: { language: 'en', region: 'US' },
            korean: { language: 'ko', region: 'KR' },
            japanese: { language: 'ja', region: 'JP' },
        };

        const config = industries[industry] || { language: 'en' };

        return tmdbAPI.getMovies({
            primary_release_year: 2025,
            with_original_language: config.language,
            region: config.region,
            page,
        });
    },

    // Get image URL
    getImageUrl: (path: string, size: string = 'w500') => {
        return path ? `${TMDB_IMAGE_BASE}/${size}${path}` : '';
    },

    // Get backdrop URL
    getBackdropUrl: (path: string, size: string = 'original') => {
        return path ? `${TMDB_IMAGE_BASE}/${size}${path}` : '';
    },
};

// Backwards compatibility exports
export const fetchMovies = tmdbAPI.getMovies;
export const fetchMovieDetails = tmdbAPI.getMovieDetails;
export const searchMovies = tmdbAPI.searchMovies;
export const fetchMoviesByIndustry = tmdbAPI.getMoviesByIndustry;
export const getMoviePoster = (path: string) => tmdbAPI.getImageUrl(path);
export const getBackdropUrl = (path: string) => tmdbAPI.getBackdropUrl(path);
export type { Movie as TMDBMovie };
