import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, ExternalLink, Headphones, AlertCircle } from 'lucide-react';
import type { Song } from '../../types';
import YouTubeLink from './YouTubeLink';

interface SongPlayerProps {
    song: Song;
    onNext?: () => void;
    onPrevious?: () => void;
}

const GLOBAL_FALLBACK = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export default function SongPlayer({ song, onNext, onPrevious }: SongPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(30);
    const [volume, setVolume] = useState(0.7);
    const [error, setError] = useState<string | null>(null);
    const [isRetrying, setIsRetrying] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio element
    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }

        const audio = audioRef.current;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration || 30);
        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            if (onNext) onNext();
        };

        const handleError = () => {
            console.warn('Audio source failed to load:', audio.src);
            // We use the internal state of the audio element or common sense here
            // because we want to avoid re-binding listeners too often
            if (audio.src !== GLOBAL_FALLBACK) {
                setIsRetrying(true);
                audio.src = GLOBAL_FALLBACK;
                audio.load();
                audio.play().catch(() => setIsPlaying(false));
            } else {
                setError('Sound preview unavailable');
                setIsPlaying(false);
            }
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
            audio.pause();
        };
    }, [onNext]); // Only depend on props-based callbacks

    // Handle song change and playback state
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const urlToPlay = song.preview_url || GLOBAL_FALLBACK;

        if (audio.src !== urlToPlay) {
            audio.pause();
            audio.src = urlToPlay;
            audio.load();
            if (isPlaying) {
                audio.play().catch(err => {
                    console.error('Autoplay failed:', err);
                    setIsPlaying(false);
                });
            }
        }
    }, [song.id, song.preview_url, isPlaying]);

    // Update volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const handlePlayPause = useCallback(async () => {
        if (!audioRef.current) return;
        const audio = audioRef.current;

        try {
            setError(null);
            setIsRetrying(false);
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                await audio.play();
                setIsPlaying(true);
            }
        } catch (err) {
            console.error('Playback error:', err);
            setError('Playback blocked by browser');
            setIsPlaying(false);
        }
    }, [isPlaying]);

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        setCurrentTime(time);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="relative group/player w-full">
            {/* Background Glow */}
            <div className={`absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl lg:rounded-[4rem] blur-xl lg:blur-2xl transition-opacity duration-1000 pointer-events-none ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />

            <div className={`relative bg-black/40 backdrop-blur-xl lg:backdrop-blur-3xl rounded-2xl lg:rounded-[3rem] p-4 sm:p-6 lg:p-8 xl:p-10 border border-white/10 shadow-2xl transition-all duration-700 ${isPlaying ? 'border-purple-500/30' : 'hover:border-white/20'}`}>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">

                    {/* Art & Title Section */}
                    <div className="flex items-center gap-8 w-full lg:w-auto">
                        <div className="relative shrink-0">
                            <div className={`aspect-square w-24 md:w-40 rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 ${isPlaying ? 'scale-105 shadow-purple-500/20' : 'group-hover:scale-105'}`}>
                                {song.album?.images?.[0]?.url ? (
                                    <img src={song.album.images[0].url} alt={song.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-purple-900/40 to-black flex items-center justify-center">
                                        <Headphones className={`w-12 h-12 transition-colors duration-1000 ${isPlaying ? 'text-purple-400' : 'text-white/20'}`} />
                                    </div>
                                )}

                                {isPlaying && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <div className="flex gap-1 h-8 items-end">
                                            {[0.8, 1.2, 1.0, 1.4].map((d, i) => (
                                                <div
                                                    key={i}
                                                    className="w-1.5 bg-purple-400 rounded-full"
                                                    style={{ animation: `music-bar ${d}s infinite ease-in-out` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1 min-w-0 flex-1">
                            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase italic truncate leading-none">
                                {song.name}
                            </h3>
                            <p className="text-purple-400 font-bold tracking-[0.3em] uppercase text-[10px] opacity-80 truncate">
                                {song.artists.join(', ')}
                            </p>
                            {song.album && (
                                <p className="text-white/20 text-[9px] font-medium uppercase tracking-[0.2em] truncate">{song.album.name}</p>
                            )}
                        </div>
                    </div>

                    {/* Controls & Progress */}
                    <div className="flex-1 w-full flex flex-col gap-8">
                        {/* Progress Bar */}
                        <div className="space-y-4">
                            <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden group/progress cursor-pointer">
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 30}
                                    step="0.1"
                                    value={currentTime}
                                    onChange={handleTimeChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-400 transition-all duration-300 rounded-full"
                                    style={{ width: `${(currentTime / (duration || 30)) * 100}%` }}
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform" />
                                </div>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-white/30 tracking-widest uppercase tabular-nums">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Main Interaction Row */}
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={onPrevious}
                                    disabled={!onPrevious}
                                    className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white/40 hover:text-white transition-all active:scale-90 disabled:opacity-10"
                                >
                                    <SkipBack className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={handlePlayPause}
                                    className="w-18 h-18 sm:w-20 sm:h-20 bg-white text-black rounded-[2rem] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_-5px_rgba(168,85,247,0.4)]"
                                >
                                    {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current translate-x-1" />}
                                </button>
                                <button
                                    onClick={onNext}
                                    disabled={!onNext}
                                    className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white/40 hover:text-white transition-all active:scale-90 disabled:opacity-10"
                                >
                                    <SkipForward className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="hidden sm:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                <Volume2 className="w-4 h-4 text-white/20" />
                                <input
                                    type="range" min="0" max="1" step="0.01" value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="w-20 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* External Buttons */}
                    <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-48">
                        <a
                            href={song.spotify_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-4 bg-[#1DB954] hover:bg-[#1ed760] text-black font-black uppercase tracking-widest text-[9px] rounded-2xl transition-all hover:-translate-y-1 flex items-center justify-center gap-3 shadow-lg shadow-green-900/20"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Spotify
                        </a>

                        {song.youtube_video_id && (
                            <YouTubeLink
                                videoId={song.youtube_video_id}
                                className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20"
                            />
                        )}
                    </div>
                </div>

                {/* Error Messaging & Status */}
                {(error || isRetrying) && (
                    <div className={`mt-6 flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest uppercase py-2 rounded-xl border ${error ? 'text-red-400 bg-red-400/10 border-red-400/20' : 'text-purple-400 bg-purple-400/10 border-purple-400/20 animate-pulse'
                        }`}>
                        {error ? <AlertCircle className="w-3 h-3" /> : <Headphones className="w-3 h-3" />}
                        {error || 'Retrying with cinematic fallback...'}
                    </div>
                )}
            </div>

            <style>{`
                @keyframes music-bar {
                    0%, 100% { height: 8px; transform: translateY(0); }
                    50% { height: 28px; transform: translateY(-4px); }
                }
            `}</style>
        </div>
    );
}
