import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useDebounce } from '../../hooks/useDebounce';

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
    const debouncedQuery = useDebounce(query, 500); // Slightly longer debounce for stability
    const inputRef = useRef<HTMLInputElement>(null);

    // Only update internal state if initialValue changes externally (e.g. navigation)
    // and ONLY if it's different from current query to avoid loops
    useEffect(() => {
        if (initialValue !== query && initialValue !== undefined) {
            setQuery(initialValue);
        }
    }, [initialValue, query]);

    // Emit debounced value only when it actually changes
    const lastEmitted = useRef(initialValue);
    useEffect(() => {
        if (debouncedQuery !== lastEmitted.current) {
            onSearch(debouncedQuery);
            lastEmitted.current = debouncedQuery;
        }
    }, [debouncedQuery, onSearch]);

    const handleClear = () => {
        setQuery('');
        onSearch('');
        inputRef.current?.focus();
    };

    return (
        <div className={cn("relative group w-full max-w-xl", className)}>
            {/* Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center">
                <div className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors">
                    <Search size={18} />
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    className={cn(
                        "w-full bg-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl py-3 pl-12 pr-12",
                        "text-white placeholder:text-slate-500 text-sm",
                        "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20",
                        "transition-all duration-300"
                    )}
                />

                <AnimatePresence>
                    {query && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={handleClear}
                            className="absolute right-4 p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                        >
                            <X size={16} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
