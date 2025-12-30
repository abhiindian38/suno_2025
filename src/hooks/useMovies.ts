import { useState, useEffect } from 'react';
import { fetchMoviesByIndustry, searchMovies, type Movie } from '../services/api/tmdb';

export const useMovies = (industryId?: string, searchQuery?: string) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                let data;
                if (searchQuery) {
                    data = await searchMovies(searchQuery);
                } else {
                    data = await fetchMoviesByIndustry(industryId || '');
                }

                setMovies(Array.isArray(data) ? data : []);
            } catch (err) {
                setMovies([]);
                setError('Failed to fetch movies');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [industryId, searchQuery]);

    return { movies, loading, error };
};
