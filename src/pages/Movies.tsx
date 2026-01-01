import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import { useMovies } from '../hooks/useMovies';
import { MovieCard } from '../components/movies/MovieCard';
import { Container } from '../components/layout/Container';
import { cn } from '../lib/utils';
import { industries } from '../config/industries';
import { PageHeader } from '../components/layout/PageHeader';
import { useFavorites } from '../hooks/useFavorites';

const Movies = () => {
    const { industry } = useParams<{ industry: string }>();
    const navigate = useNavigate();
    const { movies, loading, error } = useMovies(industry);
    const { isFavorite, toggleFavorite } = useFavorites();

    const selectedIndustry = industries.find(ind => ind.id === industry);
    const title = selectedIndustry ? selectedIndustry.name : 'All Media';
    const subtitle = selectedIndustry
        ? selectedIndustry.description
        : 'Explore the vast cinematic multiverse, from Bollywood classics to Hollywood blockbusters.';

    const breadcrumbs = [
        { label: 'Movies', path: industry ? '/movies' : undefined },
        ...(selectedIndustry ? [{ label: selectedIndustry.name }] : [])
    ];

    if (loading) return (
        <Container className="py-20 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </Container>
    );

    if (error) return (
        <Container className="py-20 text-center text-red-500">
            {error}
        </Container>
    );

    return (
        <div className="w-full min-h-screen pb-24 px-6 md:px-12">
            <div className="max-w-[1800px] mx-auto">
                <PageHeader
                    title={
                        <>
                            {title} <span className="text-primary italic uppercase">Movies</span>
                        </>
                    }
                    subtitle={subtitle}
                    breadcrumbs={breadcrumbs}
                />

                {/* Horizontal Industry Selection (Circular) */}
                <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto pb-10 pt-4 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                    {/* All Media Circular Button */}
                    <Link
                        to="/movies"
                        className="flex flex-col items-center gap-3 group outline-none"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "w-14 h-14 sm:w-16 md:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-500 border glass-panel",
                                !industry
                                    ? "bg-primary/20 border-primary shadow-[0_0_30px_rgba(0,240,255,0.4)] scale-110"
                                    : "bg-surface/50 border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10"
                            )}
                        >
                            <Film className={cn(
                                "w-5 h-5 sm:w-6 md:w-8 sm:h-8 transition-colors duration-500",
                                !industry ? "text-primary " : "text-slate-400 group-hover:text-primary"
                            )} />

                            {/* Inner Glow */}
                            {!industry && (
                                <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse -z-10" />
                            )}
                        </motion.div>
                        <span className={cn(
                            "text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500",
                            !industry ? "text-primary" : "text-slate-500 group-hover:text-primary"
                        )}>
                            All Media
                        </span>
                    </Link>

                    {industries.map(ind => {
                        const Icon = ind.icon;
                        const isActive = industry === ind.id;

                        return (
                            <Link
                                key={ind.id}
                                to={`/movies/${ind.id}`}
                                className="flex flex-col items-center gap-3 group outline-none"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={cn(
                                        "w-14 h-14 sm:w-16 md:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-500 border glass-panel",
                                        isActive
                                            ? "bg-primary/20 border-primary shadow-[0_0_30px_rgba(0,240,255,0.4)] scale-110"
                                            : "bg-surface/50 border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10"
                                    )}
                                >
                                    <Icon className={cn(
                                        "w-5 h-5 sm:w-6 md:w-8 sm:h-8 transition-colors duration-500",
                                        isActive ? "text-primary" : "text-slate-400 group-hover:text-primary"
                                    )} />

                                    {/* Inner Glow */}
                                    {isActive && (
                                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse -z-10" />
                                    )}
                                </motion.div>
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500",
                                    isActive ? "text-primary" : "text-slate-500 group-hover:text-primary"
                                )}>
                                    {ind.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
                <motion.div
                    key={`movie-grid-${industry || 'all'}`}
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
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 min-h-[400px]"
                >
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <motion.div
                                key={movie.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 }
                                }}
                            >
                                <MovieCard
                                    movie={movie}
                                    isSelected={false}
                                    onSelect={(m) => navigate(`/movie/${m.id}`)}
                                    isFavorite={isFavorite(movie.id)}
                                    onToggleFavorite={toggleFavorite}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-slate-500 font-bold uppercase tracking-[0.3em]">No frequencies detected in this sector.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Movies;
