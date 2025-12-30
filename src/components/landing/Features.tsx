import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { industries } from '../../config/industries';

// Clean, minimal industry card
function IndustryCard({
    industry,
    index,
}: {
    industry: { id: string; name: string; color: string; image: string };
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Link
                to="/movies"
                state={{ industry: industry.id }}
                className="block group h-full"
            >
                <div
                    className="relative aspect-square rounded-2xl overflow-hidden glass-card transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
                >
                    {/* Background Image */}
                    <img
                        src={industry.image}
                        alt={industry.name}
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                        <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight">
                            {industry.name}
                        </h3>
                        <p className="text-primary text-xs sm:text-sm mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 uppercase font-black tracking-widest">
                            Explore Now →
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function Features() {
    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-[#030014]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-fluid-h2 mb-4">
                        Select Your{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Industry
                        </span>
                    </h2>
                    <p className="text-fluid-subtitle max-w-md mx-auto">
                        Explore the cinematic soundscapes of India's diverse film industries
                    </p>
                </motion.div>

                {/* Industry Grid - Responsive with CSS Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {industries.map((industry, index) => (
                        <IndustryCard
                            key={industry.id}
                            industry={industry}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom Accent */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-16 h-px max-w-lg mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                />
            </div>
        </section>
    );
}
