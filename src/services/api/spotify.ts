import axios from 'axios';

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

const spotifyAPI = axios.create({
    baseURL: SPOTIFY_BASE_URL,
});

// Get access token
const getAccessToken = async (): Promise<string> => {
    if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
        return accessToken;
    }

    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        console.warn('Spotify Client ID or Secret missing. Using mock mode.');
        return 'mock-token';
    }

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
                },
            }
        );

        accessToken = response.data.access_token;
        tokenExpiry = Date.now() + response.data.expires_in * 1000;

        return accessToken || 'mock-token';
    } catch (error) {
        console.error('Failed to get Spotify access token:', error);
        return 'mock-token';
    }
};

// Add interceptor for auth
spotifyAPI.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();
        if (token !== 'mock-token') {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const spotifyService = {
    // Search for movie soundtrack
    searchMovieSoundtrack: async (movieTitle: string, year: number = 2025) => {
        try {
            const query = `${movieTitle} soundtrack ${year}`;
            const response = await spotifyAPI.get('/search', {
                params: {
                    q: query,
                    type: 'album',
                    limit: 5,
                },
            });

            return response.data.albums.items;
        } catch (error) {
            console.error('Spotify search error:', error);
            return [];
        }
    },

    // Get album tracks
    getAlbumTracks: async (albumId: string) => {
        try {
            const response = await spotifyAPI.get(`/albums/${albumId}/tracks`);
            return response.data.items;
        } catch (error) {
            console.error('Get album tracks error:', error);
            return [];
        }
    },

    // Search for songs with movie title
    searchMovieSongs: async (movieTitle: string, songTitle?: string) => {
        try {
            // If we are in mock mode (no API keys), we might want to return something or handled elsewhere
            const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
            console.log('Spotify Connection Check:', {
                hasClientId: !!clientId,
                clientIdLength: clientId?.length || 0
            });

            if (!clientId) {
                console.warn('Spotify Client ID is missing. Check your .env.local file.');
                return [];
            }

            const query = songTitle
                ? `${songTitle} ${movieTitle}`
                : `${movieTitle} song`;

            const response = await spotifyAPI.get('/search', {
                params: {
                    q: query,
                    type: 'track',
                    limit: 20,
                },
            });

            interface SpotifyTrackResponse {
                id: string;
                name: string;
                artists: Array<{ name: string }>;
                duration_ms: number;
                preview_url: string | null;
                external_urls: { spotify: string };
                album: {
                    name: string;
                    images: Array<{ url: string }>;
                };
            }

            return response.data.tracks.items.map((track: SpotifyTrackResponse) => ({
                id: track.id,
                name: track.name,
                artists: track.artists.map((artist) => artist.name),
                duration_ms: track.duration_ms,
                preview_url: track.preview_url,
                spotify_url: track.external_urls.spotify,
                album: {
                    name: track.album.name,
                    images: track.album.images,
                },
            }));
        } catch (error) {
            console.error('Spotify search error:', error);
            return [];
        }
    },

    // Get track details
    getTrack: async (trackId: string) => {
        try {
            const response = await spotifyAPI.get(`/tracks/${trackId}`);
            return response.data;
        } catch (error) {
            console.error('Get track error:', error);
            return null;
        }
    },
};
