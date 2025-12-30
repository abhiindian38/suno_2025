import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface NeonButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'accent' | 'gold';
    children: React.ReactNode;
}

export const NeonButton = ({ variant = 'primary', className, children, ...props }: NeonButtonProps) => {
    const variants = {
        primary: "border-primary text-primary hover:bg-primary/10 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)]",
        secondary: "border-secondary text-secondary hover:bg-secondary/10 shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.8)]",
        accent: "border-accent text-accent hover:bg-accent/10 shadow-[0_0_15px_rgba(244,114,182,0.5)] hover:shadow-[0_0_25px_rgba(244,114,182,0.8)]",
        gold: "border-gold text-gold hover:bg-gold/10 shadow-[0_0_15px_rgba(251,191,36,0.5)] hover:shadow-[0_0_25px_rgba(251,191,36,0.8)]",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-all duration-300 border-2 backdrop-blur-sm",
                variants[variant],
                className
            )}
            {...props}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};
