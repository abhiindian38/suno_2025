import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function Footer() {
    const location = useLocation();
    const currentYear = new Date().getFullYear();

    // Footer only appears on the Landing page
    if (location.pathname !== '/') {
        return null;
    }

    return (
        <footer className="w-full py-12 mt-auto relative overflow-hidden flex items-center justify-center">
            {/* Extremely subtle divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.1)]" />

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-1"
            >
                <div className="relative group cursor-default">
                    <span className="text-[8px] sm:text-[9px] md:text-[11px] font-medium tracking-[0.4em] sm:tracking-[0.5em] uppercase text-white/20 transition-all duration-1000 group-hover:text-white/40 group-hover:tracking-[0.45em] sm:group-hover:tracking-[0.55em]">
                        Developed by <a href="https://x.com/whyabhishekh" target="_blank" rel="noopener noreferrer" className="text-white/40 group-hover:text-primary transition-all duration-700 hover:underline decoration-primary/50 underline-offset-2 cursor-pointer inline-block min-w-[44px] min-h-[20px]">Abhishek</a> • {currentYear}
                    </span>

                    {/* Subtle precise glow behind the text */}
                    <div className="absolute inset-0 -z-10 bg-primary/0 blur-xl group-hover:bg-primary/10 transition-all duration-1000 scale-150" />
                </div>

                {/* Micro-signature line: Very slow, breathing pulse */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: [0, 16, 0] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.5, 1]
                    }}
                    className="h-[1px] bg-primary/30"
                />
            </motion.div>
        </footer>
    );
}
