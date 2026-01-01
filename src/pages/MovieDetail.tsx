import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Star, Calendar, Music, Share2 } from 'lucide-react';
import { tmdbAPI, type MovieDetail as TMDBMovieDetail } from '../services/api/tmdb';
import { spotifyService } from '../services/api/spotify';
import { youtubeService } from '../services/api/youtube';
import { createMockTracks } from '../services/audioFallbackService';
import type { Song } from '../types';
import SoundtrackShowcase from '../components/music/SoundtrackShowcase';

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    const [movie, setMovie] = useState<TMDBMovieDetail | null>(null);
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);

    // Parallax & Motion Values
    const backdropY = useTransform(scrollY, [0, 500], [0, 150]);
    const backdropOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);
    const contentY = useTransform(scrollY, [0, 500], [0, -50]);

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const movieData = await tmdbAPI.getMovieDetails(parseInt(id));
                if (movieData) {
                    setMovie(movieData);
                    let spotifySongs = await spotifyService.searchMovieSongs(movieData.title);
                    if (spotifySongs.length === 0) {
                        const genres = movieData.genres?.map((g: { name: string }) => g.name) || ['Epic'];
                        spotifySongs = createMockTracks(movieData.title, genres);
                    }
                    setSongs(spotifySongs);
                    setLoading(false);

                    // Background enrichment for YouTube links
                    const enrichedSongs = [...spotifySongs];
                    for (let i = 0; i < Math.min(enrichedSongs.length, 5); i++) {
                        const youtubeData = await youtubeService.searchMovieSong(
                            movieData.title,
                            enrichedSongs[i].name,
                            enrichedSongs[i].artists[0]
                        );
                        if (youtubeData) {
                            enrichedSongs[i] = { ...enrichedSongs[i], youtube_video_id: youtubeData.videoId };
                            setSongs([...enrichedSongs]);
                        }
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-[#030014] flex flex-col items-center justify-center gap-6">
            <div className="relative w-32 h-32">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-t-2 border-primary rounded-full shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border-b-2 border-secondary rounded-full shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Music className="w-8 h-8 text-white animate-pulse" />
                </div>
            </div>
            <span className="text-xs font-black tracking-[0.5em] text-primary uppercase">Loading Soundtrack</span>
        </div>
    );

    if (!movie) return <div className="min-h-screen bg-[#030014] text-white flex items-center justify-center">Movie Not Found</div>;

    return (
        <div className="min-h-screen bg-background text-white selection:bg-primary/30 relative" ref={containerRef}>
            {/* Sticky Header */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center pointer-events-none safe-top"
            >
                <div className="flex gap-4 pointer-events-auto">
                    <motion.button
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(-1)}
                        className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all shadow-2xl btn-glow"
                    >
                        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.button>
                </div>

                <div className="flex gap-4 pointer-events-auto">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all shadow-2xl btn-glow"
                    >
                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </motion.button>
                </div>
            </motion.header>

            {/* Immersive Backdrop */}
            <div className="relative h-[70vh] sm:h-[60vh] lg:h-screen overflow-hidden">
                <motion.div
                    style={{ y: backdropY, opacity: backdropOpacity }}
                    className="absolute inset-0"
                >
                    <img
                        src={tmdbAPI.getBackdropUrl(movie.backdrop_path)}
                        alt={movie.title}
                        className="w-full h-full object-cover scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                </motion.div>

                {/* Hero Content */}
                <div className="absolute inset-x-0 bottom-0 px-4 sm:px-8 lg:px-16 xl:px-24 pb-16 sm:pb-24 lg:pb-32">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-end gap-8 lg:gap-12 text-center lg:text-left">
                        {/* Poster */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, type: "spring" }}
                            className="w-40 sm:w-48 lg:w-56 xl:w-72 aspect-[2/3] rounded-2xl lg:rounded-3xl overflow-hidden border border-white/20 shadow-[0_50px_100px_rgba(0,0,0,0.8)] group shrink-0"
                        >
                            <img
                                src={tmdbAPI.getImageUrl(movie.poster_path)}
                                alt={movie.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                        </motion.div>

                        <div className="flex-1 space-y-6 w-full lg:w-auto">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center justify-center lg:justify-start gap-3"
                            >
                                <div className="h-[2px] w-12 sm:w-16 bg-primary" />
                                <span className="text-[10px] sm:text-xs font-black tracking-[0.4em] sm:tracking-[0.6em] text-primary uppercase">Cinematic Soundtrack</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] uppercase text-center lg:text-left"
                            >
                                <span className="block text-white drop-shadow-2xl">{movie.title}</span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
                            >
                                <div className="flex items-center gap-2 px-3 py-1.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                                    <span className="font-bold text-[10px] sm:text-sm">{movie.vote_average.toFixed(1)}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
                                    <span className="font-bold text-[10px] sm:text-sm">{movie.release_date.split('-')[0]}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-md text-primary">
                                    <Music className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="font-bold text-[10px] sm:text-sm">{songs.length} Tracks</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <motion.div
                style={{ y: contentY }}
                className="relative z-10 px-4 sm:px-8 lg:px-16 xl:px-24 -mt-8 sm:-mt-12 lg:-mt-16 space-y-16 sm:space-y-24 pb-24 sm:pb-32"
            >
                {/* Soundtrack Section */}
                <section className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                        className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-cinematic"
                    >
                        <SoundtrackShowcase songs={songs} movieTitle={movie.title} />
                    </motion.div>
                </section>

                {/* Movie Overview */}
                <section className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.3, delay: 0.1 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-[2px] w-16 sm:w-24 bg-gradient-to-r from-primary to-transparent" />
                            <h2 className="text-meta text-primary">About</h2>
                        </div>

                        <p className="text-base sm:text-xl lg:text-2xl font-light leading-relaxed text-gray-400 text-center lg:text-left">
                            {movie.overview}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pt-8">
                            {[
                                { label: "Studio", value: movie.production_companies?.[0]?.name || "Independent" },
                                { label: "Runtime", value: `${movie.runtime} Min` },
                                { label: "Language", value: movie.original_language?.toUpperCase() },
                                { label: "Status", value: movie.status },
                            ].map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <span className="text-meta text-slate-500">{item.label}</span>
                                    <p className="text-sm sm:text-base lg:text-lg font-bold text-white border-l-2 border-primary pl-3 sm:pl-4">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>
            </motion.div>

            {/* Background Flourish */}
            <div className="fixed top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 blur-[100px] sm:blur-[150px] -z-10 rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-secondary/5 blur-[100px] sm:blur-[150px] -z-10 rounded-full pointer-events-none" />
        </div>
    );
};

export default MovieDetail;
