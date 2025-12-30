import { motion } from 'framer-motion';

// Generate static particle properties outside the component to ensure purity
const PARTICLE_COUNT = 20;
const particles = [...Array(PARTICLE_COUNT)].map((_, i) => ({
    id: i,
    x: Math.random() * 100 + "%",
    y: Math.random() * 100 + "%",
    opacity: Math.random() * 0.5 + 0.2,
    scale: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 10,
    yOffset: (Math.random() * -100 - 50) + "px"
}));

export const BackgroundBeams = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Ambient Gradient Mesh */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 2 }}
                className="absolute inset-0"
            >
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-ambient-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px] animate-ambient-slow-reverse" />
            </motion.div>

            {/* Subtle Particles */}
            <div className="absolute inset-0 opacity-20">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{
                            x: p.x,
                            y: p.y,
                            opacity: p.opacity,
                            scale: p.scale
                        }}
                        animate={{
                            y: [null, p.yOffset],
                            opacity: [null, 0]
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: p.delay
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                    />
                ))}
            </div>

            {/* Scanned Line Overlay - Extremely subtle */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] bg-[length:100%_4px] opacity-20" />
        </div>
    );
};
