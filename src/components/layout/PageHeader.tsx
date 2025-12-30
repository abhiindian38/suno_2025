import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface PageHeaderProps {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    className?: string;
    actions?: React.ReactNode;
}

export const PageHeader = ({
    title,
    subtitle,
    breadcrumbs,
    className,
    actions
}: PageHeaderProps) => {
    return (
        <div className={cn("mb-12", className)}>
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-2 text-meta mb-8 text-[10px] sm:text-xs">
                    <Link to="/" className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors group">
                        <Home size={14} className="group-hover:scale-110 transition-transform" />
                        <span>Home</span>
                    </Link>

                    {breadcrumbs.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <ChevronRight size={12} className="text-slate-600" />
                            {item.path ? (
                                <Link
                                    to={item.path}
                                    className="text-slate-400 hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-primary font-bold truncate max-w-[150px] sm:max-w-none">
                                    {item.label}
                                </span>
                            )}
                        </div>
                    ))}
                </nav>
            )}

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-fluid-h2 font-black tracking-tighter uppercase leading-none"
                    >
                        {title}
                    </motion.h1>
                    {subtitle && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/60 max-w-2xl text-lg"
                        >
                            {subtitle}
                        </motion.div>
                    )}
                </div>
                {actions && (
                    <div className="flex items-center gap-4">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
};
