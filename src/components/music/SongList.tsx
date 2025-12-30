import { Play, Volume2 } from 'lucide-react';
import type { Song } from '../../types';

interface SongListProps {
    songs: Song[];
    onSelectSong: (song: Song, index: number) => void;
    currentSongId?: string;
}

export default function SongList({ songs, onSelectSong, currentSongId }: SongListProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-purple-500 rounded-full" />
                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white/40">Tracklist</h3>
                </div>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.1em]">{songs.length} Items</span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {songs.length === 0 ? (
                    <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
                        <p className="text-[10px] font-black text-white/10 uppercase tracking-widest">No soundtrack fragments found</p>
                    </div>
                ) : (
                    songs.map((song, index) => {
                        const isActive = currentSongId === song.id;
                        return (
                            <button
                                key={song.id}
                                onClick={() => onSelectSong(song, index)}
                                className={`w-full group relative flex items-center gap-6 p-4 rounded-2xl transition-all duration-500 overflow-hidden ${isActive
                                    ? 'bg-white/5 shadow-2xl ring-1 ring-white/10'
                                    : 'hover:bg-white/[0.03]'
                                    }`}
                            >
                                <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-white/5">
                                    {song.album?.images?.[0]?.url ? (
                                        <img src={song.album.images[0].url} alt="" className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                    ) : (
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                            <span className="text-[10px] font-bold text-white/20">{index + 1}</span>
                                        </div>
                                    )}

                                    {isActive && (
                                        <div className="absolute inset-0 bg-purple-500/60 flex items-center justify-center backdrop-blur-sm">
                                            <div className="flex gap-1 items-end h-4">
                                                <div className="w-1 bg-white rounded-full animate-[music-bar_0.6s_infinite]" />
                                                <div className="w-1 bg-white rounded-full animate-[music-bar_0.9s_infinite_0.1s]" />
                                                <div className="w-1 bg-white rounded-full animate-[music-bar_0.7s_infinite_0.2s]" />
                                            </div>
                                        </div>
                                    )}
                                    <div className={`absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center ${isActive ? 'hidden' : ''}`}>
                                        <Play className="w-4 h-4 text-white fill-current" />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0 text-left">
                                    <h4 className={`text-sm font-bold truncate transition-colors ${isActive ? 'text-purple-400' : 'text-white/80 group-hover:text-white'}`}>
                                        {song.name}
                                    </h4>
                                    <p className="text-[10px] font-medium text-white/30 truncate uppercase tracking-wider">
                                        {song.artists.join(', ')}
                                    </p>
                                </div>

                                <div className="shrink-0 flex items-center gap-4 text-right">
                                    {isActive && (
                                        <div className="flex items-center gap-2 text-purple-500/50">
                                            <Volume2 className="w-3 h-3 animate-pulse" />
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Playing</span>
                                        </div>
                                    )}
                                    <span className={`text-[10px] font-bold tabular-nums tracking-tighter ${isActive ? 'text-purple-500/40' : 'text-white/10 group-hover:text-white/30'}`}>
                                        {Math.floor(song.duration_ms / 60000)}:
                                        {Math.floor((song.duration_ms % 60000) / 1000).toString().padStart(2, '0')}
                                    </span>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.2); }
            `}</style>
        </div>
    );
}
