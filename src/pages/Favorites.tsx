import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';
import { MovieCard } from '../components/movies/MovieCard';
import { NeonButton } from '../components/ui/NeonButton';
import { Link } from 'react-router-dom';
import type { Movie } from '../services/api/tmdb';
import { useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';

export default function Favorites() {
    const { favorites, toggleFavorite } = useFavorites();
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    return (
        <div className="w-full min-h-screen pb-24 px-6 md:px-12">
            <div className="max-w-[1800px] mx-auto">
                <PageHeader
                    title={
                        <>
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-primary">Collection</span>
                        </>
                    }
                    subtitle="Curated by you. The best of the multiverse, saved for safe keeping."
                    breadcrumbs={[{ label: 'Favorites' }]}
                />

                {favorites.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel rounded-3xl p-12 md:p-24 text-center border border-white/10 flex flex-col items-center justify-center min-h-[500px]"
                    >
                        <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-cinematic">
                            <span className="text-5xl grayscale opacity-50">💔</span>
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">No Favorites Yet</h3>
                        <p className="text-white/40 text-lg mb-10 max-w-md">The universe is vast, but your collection is empty. Start exploring to build your library.</p>
                        <Link to="/movies">
                            <NeonButton className="px-10 py-4 text-sm">Explore The Multiverse</NeonButton>
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.05
                                }
                            }
                        }}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 place-items-center sm:place-items-stretch"
                    >
                        <AnimatePresence>
                            {favorites.map((movie) => (
                                <motion.div
                                    key={movie.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        show: { opacity: 1, y: 0 }
                                    }}
                                    layout
                                    initial="hidden"
                                    animate="show"
                                    exit={{ opacity: 0, scale: 0.9 }}
                                >
                                    <MovieCard
                                        movie={movie}
                                        isSelected={selectedMovie?.id === movie.id}
                                        onSelect={setSelectedMovie}
                                        isFavorite={true}
                                        onToggleFavorite={toggleFavorite}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
