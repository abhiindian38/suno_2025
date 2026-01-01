import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const posters = [
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600",
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600",
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600",
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600"
    ];

    const [particles, setParticles] = useState<Array<{
        initialX: string;
        initialY: string;
        initialOpacity: number;
        y1: string;
        y2: string;
        opacity1: number;
        opacity2: number;
        opacity3: number;
        duration: number;
    }>>([]);

    useEffect(() => {
        // Delay particle generation to next tick to avoid synchronous setState warning
        // and potential hydration mismatches (if SSR were used).
        const timer = setTimeout(() => {
            setParticles([...Array(20)].map(() => ({
                initialX: Math.random() * 100 + "%",
                initialY: Math.random() * 100 + "%",
                initialOpacity: Math.random() * 0.3 + 0.1,
                y1: Math.random() * 100 + "%",
                y2: Math.random() * 100 + "%",
                opacity1: Math.random() * 0.3 + 0.1,
                opacity2: Math.random() * 0.5 + 0.2,
                opacity3: Math.random() * 0.3 + 0.1,
                duration: Math.random() * 20 + 20,
            })));
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative min-h-screen md:min-h-[110vh] flex items-center justify-center overflow-hidden">
            {/* Cinematic Background Layer */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--color-primary-glow)_0%,_transparent_50%)] opacity-20 animate-pulse-slow" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--color-secondary-glow)_0%,_transparent_50%)] opacity-20 animate-pulse-slow delay-1000" />
            </div>

            {/* Floating Particles Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: p.initialX,
                            y: p.initialY,
                            opacity: p.initialOpacity,
                        }}
                        animate={{
                            y: [p.y1, p.y2],
                            opacity: [p.opacity1, p.opacity2, p.opacity3],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                    />
                ))}
            </div>

            {/* Orbiting Elements Layer (Z-Axis Depth) - Hidden on mobile for performance */}
            <div className="absolute inset-0 pointer-events-none perspective-1000 overflow-hidden hidden md:block">
                {posters.map((url, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 0.15, // Reduced opacity for less distraction
                            scale: 1,
                            x: [Math.sin(i * Math.PI / 2) * 400, Math.sin(i * Math.PI / 2 + Math.PI / 8) * 420, Math.sin(i * Math.PI / 2) * 400],
                            y: [Math.cos(i * Math.PI / 2) * 200, Math.cos(i * Math.PI / 2 + Math.PI / 8) * 220, Math.cos(i * Math.PI / 2) * 200],
                            z: [i * 100, i * 100 + 50, i * 100],
                            rotateY: [i * 20, i * 20 + 10, i * 20]
                        }}
                        transition={{
                            duration: 15 + i * 3, // Slower animation
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{ translateZ: i * 50 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-72 rounded-2xl overflow-hidden glass-card transition-all duration-500"
                    >
                        <img src={url} alt="Orbit" className="w-full h-full object-cover filter grayscale opacity-50 block" /> {/* Explicit block to remove any inline-block spacing issues if any, and reduced opacity */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" /> {/* Soft fade into background */}
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
                <motion.div
                    style={{ y: y1, opacity }}
                    className="flex flex-col items-center"
                >
                    {/* Kinetic Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 md:mb-8 px-3 md:px-4 py-1.5 rounded-full border border-primary/40 bg-black/60 backdrop-blur-md flex items-center gap-2 md:gap-2.5 group cursor-default shadow-lg shadow-primary/5"
                    >
                        <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary fill-primary" />
                        <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-white group-hover:text-primary transition-colors">
                            Neural Sync Activated
                        </span>
                    </motion.div>

                    {/* Kinetic Typography Title */}
                    <div className="relative mb-6">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h1 className="text-fluid-h1 select-none">
                                <span className="block text-white">SUNO</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">2025</span>
                            </h1>
                        </motion.div>

                        {/* Title Ghosting Effect - Subtle */}
                        <motion.span
                            animate={{ opacity: [0, 0.05, 0], x: [0, 5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute inset-0 text-fluid-h1 text-white/5 blur-sm pointer-events-none"
                        >
                            SUNO 2025
                        </motion.span>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm md:text-base font-medium tracking-wide text-gray-300 mb-10 max-w-xl mx-auto px-4 leading-relaxed"
                    >
                        Experience the <span className="text-white font-semibold">Cyber-Cinematic</span> evolution of Indian music.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full px-4"
                    >
                        <Link to="/movies" className="w-full sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative bg-primary text-black w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all duration-300 touch-target"
                            >
                                Enter the Multiverse
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>


            </div>

            {/* Cinematic Floor Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-background to-transparent z-10" />

            {/* Animated Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-20 flex flex-col items-center gap-2 md:gap-3"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-[9px] md:text-meta text-primary opacity-70">Deep Dive</span>
                <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-primary to-transparent shadow-[0_0_10px_rgba(0,240,255,0.3)]" />
            </motion.div>
        </section>
    );
}
