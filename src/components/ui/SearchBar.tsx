import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SearchBarProps {
    onSearch: (query: string) => void;
    initialValue?: string;
    placeholder?: string;
    className?: string;
    autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    initialValue = '',
    placeholder = 'Search movies, industries, or frequencies...',
    className,
    autoFocus = false
}) => {
    const [query, setQuery] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync with initialValue changes from parent
    useEffect(() => {
        setQuery(initialValue);
    }, [initialValue]);

    const handleSearch = () => {
        onSearch(query.trim());
    };

    const handleClear = () => {
        setQuery('');
        onSearch('');
        inputRef.current?.focus();
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={cn("relative group w-full max-w-xl", className)}>
            {/* Enhanced Background Glow - more prominent */}
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-accent/20 to-secondary/30 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative flex items-center gap-3">
                <div className="flex-1 relative flex items-center">
                    {/* Search Icon - enhanced visibility */}
                    <div className="absolute left-5 text-slate-400 group-focus-within:text-primary transition-colors duration-300 z-10 pointer-events-none">
                        <Search size={20} strokeWidth={2.5} />
                    </div>

                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={placeholder}
                        autoFocus={autoFocus}
                        style={{ color: '#FFFFFF' }}
                        className={cn(
                            "w-full bg-surface/60 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl py-2.5 md:py-4 pl-12 md:pl-14 pr-12 md:pr-14",
                            "!text-white placeholder:text-slate-400 text-sm md:text-base font-semibold",
                            "focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30",
                            "focus:bg-surface/70 focus:shadow-[0_0_30px_rgba(0,240,255,0.15)]",
                            "transition-all duration-500 ease-out",
                            "hover:border-white/20 hover:bg-surface/65",
                            "relative z-20",
                            "[color-scheme:dark]"
                        )}
                    />

                    <AnimatePresence>
                        {query && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={handleClear}
                                className="absolute right-4 md:right-5 p-1.5 md:p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-300 z-30 touch-target"
                                type="button"
                            >
                                <X className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={2.5} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {/* Search Button */}
                <motion.button
                    onClick={handleSearch}
                    disabled={!query.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                        "px-6 md:px-8 py-2.5 md:py-4 rounded-2xl md:rounded-3xl font-black uppercase tracking-wider text-[10px] md:text-sm",
                        "bg-gradient-to-r from-primary to-accent",
                        "text-black shadow-lg shadow-primary/30",
                        "hover:shadow-xl hover:shadow-primary/50",
                        "transition-all duration-300",
                        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100",
                        "relative z-20 flex items-center gap-2 touch-target"
                    )}
                    type="button"
                >
                    <Search className="w-3.5 h-3.5 md:w-[18px] md:h-[18px]" strokeWidth={3} />
                    <span className="hidden xs:inline">Scan</span>
                </motion.button>
            </div>
        </div>
    );
};
