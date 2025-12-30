import { motion } from 'framer-motion';
import { Youtube, Music2, Headphones } from 'lucide-react';
import type { Song } from '../../types';

interface SongCardProps {
    song: Song;
    index: number;
}

export default function SongCard({ song, index }: SongCardProps) {
    const hasImage = song.album?.images?.[0]?.url;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        >
            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyber-purple/5 to-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                {/* Album Art */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-gradient-to-br from-purple-900/30 to-black relative group-hover:border-primary/50 transition-colors">
                    {hasImage ? (
                        <img
                            src={song.album?.images?.[0]?.url}
                            alt={song.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Headphones className="w-8 h-8 text-white/20" />
                        </div>
                    )}
                </div>

                {/* Song Info */}
                <div className="flex-1 min-w-0 space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-white truncate group-hover:text-primary transition-colors tracking-tight">
                        {song.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-400 truncate tracking-wide">
                        {song.artists.join(', ')}
                    </p>
                    {song.album && (
                        <p className="text-xs font-medium text-slate-500 truncate hidden sm:block tracking-wider uppercase">
                            {song.album.name}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                    {/* Spotify Button */}
                    <a
                        href={song.spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-[#1DB954]/10 hover:bg-[#1DB954]/20 border border-[#1DB954]/20 hover:border-[#1DB954]/50 rounded-xl text-[#1DB954] font-black text-[10px] sm:text-xs uppercase tracking-[0.1em] transition-all duration-300 hover:shadow-[0_0_15px_rgba(29,185,84,0.3)] hover:-translate-y-0.5"
                    >
                        <Music2 className="w-4 h-4" />
                        <span className="sm:inline">Spotify</span>
                    </a>

                    {/* YouTube Button (Standardized) */}
                    <a
                        href={song.youtube_video_id
                            ? `https://www.youtube.com/watch?v=${song.youtube_video_id}`
                            : `https://www.youtube.com/results?search_query=${encodeURIComponent(song.name + ' ' + song.artists[0] + ' song')}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-[#FF0000]/10 hover:bg-[#FF0000]/20 border border-[#FF0000]/20 hover:border-[#FF0000]/50 rounded-xl text-[#FF0000] font-black text-[10px] sm:text-xs uppercase tracking-[0.1em] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] hover:-translate-y-0.5"
                    >
                        <Youtube className="w-4 h-4" />
                        <span className="sm:inline">YouTube</span>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
