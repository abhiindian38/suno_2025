import { Github, Twitter, Disc, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="relative bg-background pt-20 pb-10 overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="inline-block mb-6">
                            <h2 className="text-fluid-h3 text-white font-display uppercase tracking-widest">
                                SUNO <span className="text-primary">2025</span>
                            </h2>
                        </Link>
                        <p className="text-body max-w-md mb-8">
                            Teleport your consciousness through the rhythms of the cinematic universe.
                            Experience music beyond boundaries.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-3 rounded-full glass-card hover:bg-primary/10 transition-colors border border-white/10 group">
                                <Github className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                            </a>
                            <a href="#" className="p-3 rounded-full glass-card hover:bg-primary/10 transition-colors border border-white/10 group">
                                <Twitter className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                            </a>
                            <a href="#" className="p-3 rounded-full glass-card hover:bg-primary/10 transition-colors border border-white/10 group">
                                <Disc className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg uppercase tracking-tight">Modules</h3>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link to="/movies" className="hover:text-primary transition-colors">Movies</Link></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Trending Songs</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Artists</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg uppercase tracking-tight">System</h3>
                        <ul className="space-y-4 text-slate-400">
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © 3025 Suno Project. All rights reserved across the multiverse.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Made with dark matter &</span>
                        <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Background glow */}
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        </footer>
    );
}
