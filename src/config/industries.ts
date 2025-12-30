import { type LucideIcon, Film, Music, Video, Clapperboard, MonitorPlay, Tv, Globe, Mic2 } from 'lucide-react';

export interface Industry {
    id: string;
    name: string;
    description: string;
    movieCount: number;
    icon: LucideIcon;
    gradient: string;
    color: string;
    image: string; // Placeholder for now, will be updated in Phase 3
}

export const industries: Industry[] = [
    {
        id: 'bollywood',
        name: 'Bollywood',
        description: "Mumbai's Cinematic Magic",
        movieCount: 124,
        icon: Film,
        gradient: 'from-pink-500 to-rose-500',
        color: '#ec4899',
        image: '/api/placeholder/400/600',
    },
    {
        id: 'tollywood',
        name: 'Tollywood',
        description: 'Telugu Cinema Powerhouse',
        movieCount: 98,
        icon: Clapperboard,
        gradient: 'from-orange-500 to-amber-500',
        color: '#f97316',
        image: '/api/placeholder/400/600',
    },
    {
        id: 'kollywood',
        name: 'Kollywood',
        description: "Chennai's Artistic Soul",
        movieCount: 86,
        icon: Music,
        gradient: 'from-yellow-400 to-orange-500',
        color: '#fbbf24',
        image: '/api/placeholder/400/600',
    },
    {
        id: 'sandalwood',
        name: 'Sandalwood',
        description: 'Kannada Cinema Pride',
        movieCount: 45,
        icon: Video,
        gradient: 'from-red-500 to-pink-600',
        color: '#ef4444',
        image: '/api/placeholder/400/600',
    },
    {
        id: 'mollywood',
        name: 'Mollywood',
        description: "Kerala's Visual Storytelling",
        movieCount: 52,
        icon: Tv,
        gradient: 'from-green-400 to-emerald-600',
        color: '#10b981',
        image: '/api/placeholder/400/600',
    },
    {
        id: 'hollywood',
        name: 'Hollywood',
        description: 'Global Blockbusters',
        movieCount: 156,
        icon: Globe,
        gradient: 'from-blue-500 to-indigo-600',
        color: '#3b82f6',
        image: '/api/placeholder/400/600',
    },
    {
        id: 'korean',
        name: 'K-Drama',
        description: 'Hallyu Wave & Cinema',
        movieCount: 78,
        icon: MonitorPlay,
        gradient: 'from-purple-500 to-violet-600',
        color: '#a855f7',
        image: '/api/placeholder/400/600',
    },
    {
        id: 'japanese',
        name: 'Anime & Live',
        description: 'Japanese Visual Arts',
        movieCount: 64,
        icon: Mic2,
        gradient: 'from-fuchsia-500 to-pink-500',
        color: '#d946ef',
        image: '/api/placeholder/400/600',
    },
];
