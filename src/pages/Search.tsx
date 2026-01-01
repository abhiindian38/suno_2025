import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import { MovieCard } from '../components/movies/MovieCard';
import { AnimatePresence, motion } from 'framer-motion';
import { PageHeader } from '../components/layout/PageHeader';
import { SearchBar } from '../components/ui/SearchBar';
import { useFavorites } from '../hooks/useFavorites';

export default function Search() {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract query from URL
    const [query, setQuery] = useState(new URLSearchParams(location.search).get('q') || '');

    // Use the hook with the query
    const { movies: results, loading, error } = useMovies(undefined, query);
    const { isFavorite, toggleFavorite } = useFavorites();

    // Sync query to URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (query) {
            params.set('q', query);
        }
        const newSearch = params.toString();
        navigate({ search: newSearch ? `?${newSearch}` : '' }, { replace: true });
    }, [query, navigate]);

    return (
        <div className="w-full min-h-screen pb-24 px-6 md:px-12">
            <div className="max-w-[1800px] mx-auto">
                <div className="flex flex-col items-center justify-center text-center mb-16 space-y-8">
                    <PageHeader
                        title={
                            <>
                                Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-cyan-400">Multiverse</span>
                            </>
                        }
                        subtitle="Search for movies, soundtracks, and frequencies across the cinematic void."
                        breadcrumbs={[{ label: 'Search' }]}
                        className="mb-0"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full flex justify-center px-4"
                    >
                        <SearchBar
                            initialValue={query}
                            onSearch={(q) => setQuery(q)}
                            placeholder="Type to scan frequencies..."
                            className="max-w-2xl transform lg:scale-110 shadow-cinematic hover:shadow-primary/20 transition-all duration-500"
                            autoFocus
                        />
                    </motion.div>
                </div>

                {error ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-black text-red-500 mb-4 uppercase tracking-tighter">Transmission Failed</h2>
                        <p className="text-slate-400">{error}</p>
                    </div>
                ) : loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-[40vh] space-y-6"
                    >
                        <div className="relative w-20 h-20">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-b-2 border-primary rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-2 border-t-2 border-accent rounded-full opacity-50"
                            />
                        </div>
                        <p className="text-xs font-black text-primary uppercase tracking-[0.5em] animate-pulse">Scanning Frequencies...</p>
                    </motion.div>
                ) : (
                    <AnimatePresence mode="wait">
                        {results.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="glass-panel rounded-[3rem] p-16 md:p-32 text-center border border-white/5 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[100px]" />
                                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative z-10">
                                    <span className="text-5xl grayscale opacity-30 group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-700">📡</span>
                                </div>
                                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter relative z-10">Signal Lost</h3>
                                <p className="text-slate-400 text-lg max-w-md leading-relaxed relative z-10 font-medium">We couldn't detect any media matching that frequency. Try adjusting your signal.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="grid"
                                initial="hidden"
                                animate="show"
                                variants={{
                                    hidden: { opacity: 0 },
                                    show: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.1
                                        }
                                    }
                                }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 xl:gap-10"
                            >
                                {results.map((movie) => (
                                    <motion.div
                                        key={movie.id}
                                        variants={{
                                            hidden: { opacity: 0, y: 30 },
                                            show: { opacity: 1, y: 0 }
                                        }}
                                        layout
                                    >
                                        <MovieCard
                                            movie={movie}
                                            isSelected={false}
                                            onSelect={(m) => navigate(`/movie/${m.id}`)}
                                            isFavorite={isFavorite(movie.id)}
                                            onToggleFavorite={toggleFavorite}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
