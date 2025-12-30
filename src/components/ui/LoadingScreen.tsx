import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

export const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014] text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
            >
                {/* Pulsing Glow */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-cyber-blue blur-xl rounded-full opacity-50"
                />

                <div className="relative z-10 w-20 h-20 bg-gradient-to-tr from-cyber-purple to-cyber-blue rounded-2xl flex items-center justify-center p-[1px]">
                    <div className="w-full h-full bg-[#030014] rounded-2xl flex items-center justify-center">
                        <Music className="w-10 h-10 text-white fill-current" />
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex flex-col items-center gap-2"
            >
                <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-cyber-purple rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-cyber-pink rounded-full animate-bounce"></span>
                </div>
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-white/50">Initializing Stream</p>
            </motion.div>
        </div>
    );
};
