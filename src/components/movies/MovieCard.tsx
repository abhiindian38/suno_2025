import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Star, Play, Film } from 'lucide-react';
import { tmdbAPI, type Movie } from '../../services/api/tmdb';
import { cn } from '../../lib/utils';

interface MovieCardProps {
    movie: Movie;
    isSelected: boolean;
    onSelect: (movie: Movie) => void;
    isFavorite?: boolean;
    onToggleFavorite?: (movie: Movie) => void;
}

export const MovieCard = ({ movie, isSelected, onSelect, isFavorite, onToggleFavorite }: MovieCardProps) => {
    // 3D Tilt Effect Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            layout
            whileHover={{ scale: 1.02 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onClick={() => onSelect(movie)}
            className={cn(
                "relative aspect-[2/3] rounded-[2rem] overflow-hidden cursor-pointer bg-surface/50 border border-white/10 group transition-colors duration-500 perspective-1000 motion-glow hover:border-primary/50 w-full",
                isSelected && "border-primary shadow-[0_0_50px_rgba(0,240,255,0.4)] ring-2 ring-primary/50"
            )}
        >
            {/* Poster Image */}
            <motion.div
                style={{ translateZ: 20 }}
                className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-transparent"
            >
                {movie.poster_path ? (
                    <img
                        src={tmdbAPI.getImageUrl(movie.poster_path)}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:blur-[2px]"
                        loading="lazy"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x750/141416/FFFFFF?text=No+Poster';
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface">
                        <Film className="w-12 h-12 text-white/10" />
                    </div>
                )}
            </motion.div>

            {/* Floating Glass UI */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:from-transparent">
                <div className="flex justify-between items-start">
                    <motion.div
                        style={{ translateZ: 50 }}
                        className="bg-black/40 backdrop-blur-md border border-white/10 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl"
                    >
                        <span className="text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest">{movie.release_date?.split('-')[0]}</span>
                    </motion.div>

                    {onToggleFavorite && (
                        <motion.button
                            style={{ translateZ: 50 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(movie);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            className="bg-black/40 backdrop-blur-md border border-white/10 p-2.5 rounded-xl sm:rounded-2xl hover:bg-accent/20 transition-all touch-target"
                        >
                            <Heart
                                size={18}
                                className={cn("transition-colors", isFavorite ? 'fill-accent text-accent' : 'text-white')}
                            />
                        </motion.button>
                    )}
                </div>

                <div className="space-y-3 sm:space-y-4 translate-y-0 lg:translate-y-2 lg:group-hover:translate-y-0 transition-transform duration-700">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-yellow-400 text-[10px] font-black uppercase tracking-widest">{movie.vote_average.toFixed(1)}</span>
                        </div>
                        <motion.h3
                            style={{ translateZ: 60 }}
                            className="text-white font-black text-xl sm:text-2xl leading-none uppercase tracking-tighter italic"
                        >
                            {movie.title}
                        </motion.h3>
                    </div>

                    <motion.div
                        style={{ translateZ: 40 }}
                        className="flex items-center gap-2 text-primary font-black text-[8px] sm:text-[9px] uppercase tracking-[0.2em] bg-primary/10 px-3 py-1.5 sm:py-2 rounded-full border border-primary/20 group-hover:bg-primary group-hover:text-background transition-colors duration-300"
                    >
                        <Play className="w-3 h-3 fill-current" />
                        Initialize Audio
                    </motion.div>
                </div>
            </div>

            {/* Static Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent opacity-60 pointer-events-none" />

            {/* Holographic scanner effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none z-20" />

            {/* Selection Pulse */}
            {isSelected && (
                <div className="absolute inset-0 pointer-events-none z-30">
                    <div className="absolute inset-0 border-4 border-primary animate-pulse rounded-[2rem] opacity-30" />
                    <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_rgba(0,240,255,1)] animate-ping" />
                </div>
            )}
        </motion.div>
    );
};
