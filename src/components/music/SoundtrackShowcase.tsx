import { motion } from 'framer-motion';
import { Music, Disc3 } from 'lucide-react';
import type { Song } from '../../types';
import SongCard from './SongCard';

interface SoundtrackShowcaseProps {
    songs: Song[];
    movieTitle: string;
}

export default function SoundtrackShowcase({ songs, movieTitle }: SoundtrackShowcaseProps) {
    if (songs.length === 0) {
        return (
            <div className="text-center py-16">
                <Disc3 className="w-16 h-16 text-white/10 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No soundtrack available for {movieTitle}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                        <Music className="w-6 h-6 lg:w-7 lg:h-7 text-background fill-current" />
                    </div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white uppercase">
                            Soundtrack
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">
                            {songs.length} {songs.length === 1 ? 'Track' : 'Tracks'} Available
                        </p>
                    </div>
                </div>
            </div>

            {/* Song List */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
            >
                {songs.map((song, index) => (
                    <SongCard key={song.id} song={song} index={index} />
                ))}
            </motion.div>


        </div>
    );
}
