import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMovies } from '../../hooks/useMovies';
import { useFavorites } from '../../hooks/useFavorites';
import { MovieCard } from './MovieCard';
import type { Movie } from '../../services/api/tmdb';
import { ChevronRight, Music, Zap, X } from 'lucide-react';

interface MovieExplorerProps {
    industry: string;
}

export const MovieExplorer = ({ industry }: MovieExplorerProps) => {
    const { movies, loading } = useMovies(industry);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const { isFavorite, toggleFavorite } = useFavorites();

    const handleMovieSelect = (movie: Movie) => {
        if (selectedMovie?.id === movie.id) {
            setSelectedMovie(null);
            return;
        }
        setSelectedMovie(movie);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-2 border-cyber-purple/20 rounded-full" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-cyber-purple border-t-transparent rounded-full shadow-[0_0_15px_rgba(188,19,254,0.5)]"
                    />
                    <motion.div
                        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-4 bg-cyber-blue/20 rounded-full flex items-center justify-center"
                    >
                        <Zap className="w-6 h-6 text-cyber-blue" />
                    </motion.div>
                </div>
                <span className="text-[10px] uppercase font-black tracking-[0.5em] text-cyan-400 animate-pulse">Syncing...</span>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Movie Grid with Staggered Animations */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {movies.map((movie, index) => (
                    <motion.div
                        key={movie.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <MovieCard
                            movie={movie}
                            isSelected={selectedMovie?.id === movie.id}
                            onSelect={handleMovieSelect}
                            isFavorite={isFavorite(movie.id)}
                            onToggleFavorite={toggleFavorite}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Cinematic Soundtrack Preview Panel */}
            <AnimatePresence>
                {selectedMovie && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.9 }}
                        className="fixed bottom-8 right-8 z-50 w-[calc(100vw-2rem)] sm:w-96 rounded-[2.5rem] p-8 glass-morphism border-t border-white/20 shadow-[0_50px_100px_rgba(0,0,0,0.8)] group overflow-hidden"
                    >
                        {/* Interactive Background Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-blue/20 blur-[60px] rounded-full group-hover:bg-cyber-purple/20 transition-colors duration-700" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-cyber-purple font-black uppercase text-[9px] tracking-[0.3em]">
                                        <Music className="w-3 h-3" />
                                        <span>Audio Signal</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter italic">
                                        {selectedMovie.title}
                                    </h3>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setSelectedMovie(null)}
                                    className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    <X className="w-4 h-4" />
                                </motion.button>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 space-y-2">
                                        <p className="text-gray-400 text-xs font-medium leading-relaxed italic line-clamp-2">
                                            "{selectedMovie.overview}"
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-bold text-cyber-blue uppercase tracking-widest bg-cyber-blue/10 px-2 py-0.5 rounded">
                                                ★ {selectedMovie.vote_average.toFixed(1)}
                                            </span>
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{selectedMovie.release_date.split('-')[0]}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link to={`/movie/${selectedMovie.id}`} className="block">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                    >
                                        Initialize Audio Sync
                                        <ChevronRight className="w-4 h-4" />
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
