import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Industry } from '../../config/industries';
import { ArrowRight } from 'lucide-react';
import { useTilt } from '../../hooks/useTilt';
import { LazyImage } from '../ui/LazyImage';
import { ParticleSystem } from '../ui/ParticleSystem';

interface IndustryCardProps {
    industry: Industry;
    onClick?: (id: string) => void;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({ industry, onClick }) => {
    const { tilt, onMouseMove, onMouseLeave } = useTilt(10);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeaveCard = () => {
        setIsHovered(false);
        onMouseLeave();
    };

    // Use a deterministic "random" delay based on industry id to satisfy purity rules
    const hoverDelay = useMemo(() => {
        let hash = 0;
        for (let i = 0; i < industry.id.length; i++) {
            hash = industry.id.charCodeAt(i) + ((hash << 5) - hash);
        }
        return (Math.abs(hash) % 200) / 100; // Returns 0-2
    }, [industry.id]);

    return (
        <motion.div
            onClick={() => onClick?.(industry.id)}
            onMouseMove={onMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeaveCard}
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: hoverDelay
            }}
            className="group relative w-64 h-64 tablet:w-72 tablet:h-72 desktop:w-80 desktop:h-80 flex-shrink-0 cursor-pointer perspective-1000"
        >
            <motion.div
                className="w-full h-full rounded-full relative preserve-3d"
                style={{
                    rotateX: tilt.x,
                    rotateY: tilt.y,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Neon Glow Ring (Behind) */}
                <div
                    className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: `radial-gradient(circle, ${industry.color || 'var(--color-primary)'}40 0%, transparent 70%)` }}
                />

                {/* Main Glass Circle */}
                <div className="absolute inset-0 rounded-full overflow-hidden glass-panel border border-white/10 group-hover:border-primary/50 transition-colors duration-500 shadow-cinematic">
                    {/* Cinematic Background Image */}
                    <div className="absolute inset-0 z-0">
                        <LazyImage
                            src={industry.image}
                            alt={industry.name}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                        />
                    </div>

                    {/* Particle System Layer */}
                    <ParticleSystem
                        isActive={isHovered}
                        className="absolute inset-0 z-[1] w-full h-full"
                        color={industry.color || '#00F0FF'}
                    />

                    {/* Multi-layered Overlays */}
                    <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-60 transition-opacity duration-700" />
                    <div className="absolute inset-0 z-[1] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />

                    {/* Content Container */}
                    <div className="relative h-full flex flex-col items-center justify-center p-8 text-center z-10 select-none">

                        {/* Sparkles (appear on hover) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                            <motion.div
                                animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="w-full h-full bg-primary/5 blur-[40px] rounded-full" />
                            </motion.div>
                        </div>

                        {/* Icon */}
                        <div className="mb-3 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                            <industry.icon className="w-10 h-10 tablet:w-12 tablet:h-12 text-white group-hover:text-primary transition-colors" />
                        </div>

                        {/* Industry Name */}
                        <h2 className="text-xl tablet:text-2xl font-black mb-1 tracking-wider text-white uppercase group-hover:tracking-[0.2em] transition-all duration-500 drop-shadow-md">
                            {industry.name}
                        </h2>

                        {/* Meta Info */}
                        <div className="text-xs font-medium uppercase tracking-widest text-slate-300 group-hover:text-primary transition-colors flex items-center gap-2">
                            <span>{industry.movieCount} Movies</span>
                        </div>

                        {/* Action Indicator */}
                        <div className="mt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>

                    {/* Noise Texture */}
                    <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none bg-noise z-[2]" />
                </div>
            </motion.div>
        </motion.div>
    );
};
