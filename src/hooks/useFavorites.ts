import { useState, useEffect } from 'react';
import type { Movie } from '../services/api/tmdb';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Movie[]>(() => {
        const saved = localStorage.getItem('suno_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('suno_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (movie: Movie) => {
        setFavorites(prev => {
            const exists = prev.find(m => m.id === movie.id);
            if (exists) {
                return prev.filter(m => m.id !== movie.id);
            }
            return [...prev, movie];
        });
    };

    const isFavorite = (movieId: number) => {
        return favorites.some(m => m.id === movieId);
    };

    return { favorites, toggleFavorite, isFavorite };
};
