// src/services/audioFallbackService.ts

// Free music samples that match movie genres
const GENRE_SAMPLES: Record<string, string[]> = {
    'sci-fi': [
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    ],
    'action': [
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
    ],
    'epic': [
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
    ],
    'romantic': [
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
    ],
    'drama': [
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3'
    ]
};

export const getGenreSample = (movieGenre: string): string => {
    const genre = movieGenre.toLowerCase();

    if (genre.includes('sci') || genre.includes('future') || genre.includes('cyber')) return GENRE_SAMPLES['sci-fi'][0];
    if (genre.includes('action') || genre.includes('adventure')) return GENRE_SAMPLES['action'][0];
    if (genre.includes('epic') || genre.includes('fantasy')) return GENRE_SAMPLES['epic'][0];
    if (genre.includes('romance') || genre.includes('love')) return GENRE_SAMPLES['romantic'][0];
    if (genre.includes('drama') || genre.includes('emotional')) return GENRE_SAMPLES['drama'][0];

    return GENRE_SAMPLES['epic'][0];
};

import type { Song } from '../types';
import { MOVIE_SOUNDTRACKS } from '../data/musicDatabase';

// Create realistic mock tracks when Spotify fails
export const createMockTracks = (movieTitle: string, genres: string[]): Song[] => {
    // Check if we have real song info for this movie
    if (MOVIE_SOUNDTRACKS[movieTitle]) {
        return MOVIE_SOUNDTRACKS[movieTitle];
    }

    const genreString = genres.join(' ');
    const sampleUrl = getGenreSample(genreString);

    return [
        {
            id: `mock-1-${movieTitle}`,
            name: `${movieTitle} Main Theme`,
            artists: ['Original Score'],
            album: {
                name: `${movieTitle} (Original Motion Picture Soundtrack)`,
                images: [{ url: 'https://via.placeholder.com/300' }]
            },
            duration_ms: 240000,
            preview_url: sampleUrl,
            spotify_url: `https://open.spotify.com/search/${encodeURIComponent(movieTitle)}`
        },
        {
            id: `mock-2-${movieTitle}`,
            name: `Arrival at ${movieTitle}`,
            artists: ['Cinematic Soundscapes'],
            album: {
                name: `${movieTitle} (Original Motion Picture Soundtrack)`,
                images: [{ url: 'https://via.placeholder.com/300' }]
            },
            duration_ms: 180000,
            preview_url: sampleUrl,
            spotify_url: `https://open.spotify.com/search/${encodeURIComponent(movieTitle)}`
        }
    ];
};
