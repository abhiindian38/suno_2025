import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Home, Film, Heart, Menu, X, Zap, Search, Dices, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tmdbAPI } from '../../services/api/tmdb';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleSurprise = async () => {
        if (isShuffling) return;
        setIsShuffling(true);

        try {
            const randomPage = Math.floor(Math.random() * 5) + 1;
            const movies = await tmdbAPI.getMovies({ page: randomPage });

            if (movies && movies.length > 0) {
                const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                setTimeout(() => {
                    navigate(`/movie/${randomMovie.id}`);
                    setIsShuffling(false);
                    closeMobileMenu();
                }, 800);
            }
        } catch (error) {
            console.error("Multiverse shuffle failed:", error);
            setIsShuffling(false);
        }
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Movies', path: '/movies', icon: Film },
        { name: 'Search', path: '/search', icon: Search },
        { name: 'Favorites', path: '/favorites', icon: Heart },
        { name: 'Feedback', path: '/feedback', icon: MessageSquare },
    ];

    // Hide navbar on movie detail pages for immersive experience
    if (location.pathname.startsWith('/movie/')) {
        return null;
    }

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 h-[var(--navbar-height-mobile)] lg:h-[var(--navbar-height-desktop)] transition-all duration-500",
                "border-b border-white/0", // Always have a border property for smooth transition
                scrolled || isMobileMenuOpen
                    ? "glass-panel !border-white/10 shadow-cinematic backdrop-blur-xl"
                    : "bg-transparent lg:bg-gradient-to-b lg:from-background/80 lg:to-transparent"
            )}
        >
            <div className="container mx-auto h-full max-w-[1400px] px-6 flex items-center justify-between gap-8">
                {/* Logo */}
                <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 group relative z-50 cursor-pointer flex-shrink-0">
                    <motion.div
                        className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg group-hover:shadow-primary/50 transition-all duration-500 group-hover:scale-110"
                        whileHover={{ rotate: 180 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                        <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-background fill-current" />
                    </motion.div>
                    <div className="flex flex-col -gap-1">
                        <span className="text-lg lg:text-xl font-black tracking-tighter leading-none text-white">SUNO</span>
                        <span className="text-[10px] font-black tracking-[0.3em] leading-none text-primary">2025</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-shrink-0">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;
                        return (
                            <motion.div key={link.path} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    to={link.path}
                                    className={cn(
                                        "flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl transition-all duration-300 ease-out group touch-target",
                                        isActive
                                            ? "text-primary bg-primary/10 shadow-[0_0_25px_rgba(0,240,255,0.15)] ring-1 ring-primary/20"
                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <Icon className={cn(
                                        "w-4 h-4 transition-transform duration-300 group-hover:scale-110",
                                        isActive && "text-primary filter drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]"
                                    )} />
                                    <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest leading-none">{link.name}</span>
                                </Link>
                            </motion.div>
                        );
                    })}

                    {/* Surprise Me Button (Desktop) */}
                    <motion.button
                        onClick={handleSurprise}
                        disabled={isShuffling}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                            "flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl transition-all duration-300 ease-out group glass-panel touch-target",
                            "text-accent border border-accent/20 hover:border-accent hover:bg-accent/10 shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                        )}
                    >
                        <motion.div
                            animate={isShuffling ? { rotate: 360 } : {}}
                            transition={{ duration: 0.5, repeat: isShuffling ? Infinity : 0, ease: "linear" }}
                        >
                            <Dices className="w-4 h-4" />
                        </motion.div>
                        <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest leading-none truncate max-w-[70px] lg:max-w-[100px]">
                            {isShuffling ? 'SHUFFLIN...' : 'SURPRISE ME'}
                        </span>
                    </motion.button>
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center gap-2 md:hidden z-50">
                    <motion.button
                        onClick={handleSurprise}
                        disabled={isShuffling}
                        whileTap={{ scale: 0.9 }}
                        className="p-2.5 rounded-xl bg-accent/20 text-accent border border-accent/30 shadow-[0_0_15px_rgba(168,85,247,0.1)] touch-target"
                    >
                        <motion.div
                            animate={isShuffling ? { rotate: 360 } : {}}
                            transition={{ duration: 0.5, repeat: isShuffling ? Infinity : 0, ease: "linear" }}
                        >
                            <Dices size={20} />
                        </motion.div>
                    </motion.button>
                    <motion.button
                        onClick={() => {
                            setIsMobileMenuOpen(!isMobileMenuOpen);
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2.5 text-slate-400 hover:text-white transition-colors duration-300 touch-target"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu Overlay - Moved inside but adjusted for stacking context */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        key="mobile-menu-overlay"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={{
                            open: { opacity: 1, y: 0 },
                            closed: { opacity: 0, y: -20 }
                        }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 top-[var(--navbar-height-mobile)] bg-[#030014]/80 backdrop-blur-3xl z-[100] md:hidden p-4 sm:p-6 overflow-y-auto touch-action-pan h-[calc(100vh-var(--navbar-height-mobile))] border-t border-white/5"
                    >
                        <motion.div
                            className="flex flex-col gap-4"
                            variants={{
                                open: {
                                    transition: { staggerChildren: 0.1 }
                                },
                                closed: {
                                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                                }
                            }}
                        >
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                const isActive = location.pathname === link.path;
                                return (
                                    <motion.div
                                        key={link.path}
                                        variants={{
                                            open: { opacity: 1, x: 0 },
                                            closed: { opacity: 0, x: -20 }
                                        }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={closeMobileMenu}
                                            className={cn(
                                                "flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 group",
                                                isActive
                                                    ? "bg-primary/10 border border-primary/30 shadow-[0_0_30px_rgba(0,240,255,0.1)]"
                                                    : "bg-white/5 border border-white/5 hover:bg-white/10"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300",
                                                isActive ? "bg-primary/20 text-primary" : "bg-white/5 text-slate-400 group-hover:text-white"
                                            )}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={cn(
                                                    "text-lg font-black uppercase tracking-[0.2em] leading-none mb-1 transition-colors",
                                                    isActive ? "text-primary" : "text-white"
                                                )}>
                                                    {link.name}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                                    {isActive ? 'CURRENT FREQUENCY' : 'NAVIGATE TO'} {link.name}
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
