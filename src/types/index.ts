export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    overview: string;
    genre_ids: number[];
    vote_average: number;
    original_language: string;
    runtime?: number;
    genres?: Array<{ id: number; name: string }>;
    budget?: number;
}

export interface Song {
    id: string;
    name: string;
    artists: string[];
    duration_ms: number;
    preview_url: string | null;
    spotify_url: string;
    youtube_video_id?: string;
    album?: {
        name: string;
        images: Array<{ url: string }>;
    };
}

export interface Industry {
    id: string;
    name: string;
    region: string;
    languages: string[];
}

export interface MovieWithSongs extends Movie {
    songs: Song[];
    soundtrack?: {
        spotify_album_id?: string;
        youtube_playlist_id?: string;
    };
}
