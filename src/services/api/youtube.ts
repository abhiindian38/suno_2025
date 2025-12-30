import axios from 'axios';

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const youtubeService = {
    // Search for movie songs on YouTube
    searchMovieSong: async (movieTitle: string, songTitle: string, artist?: string) => {
        try {
            const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
            console.log('YouTube Connection Check:', {
                hasApiKey: !!apiKey,
                keyLength: apiKey?.length || 0
            });

            if (!apiKey) {
                console.warn('YouTube API Key missing.');
                return null;
            }

            const query = `${songTitle} ${movieTitle} ${artist || ''} official`;
            const response = await axios.get(`${YOUTUBE_BASE_URL}/search`, {
                params: {
                    part: 'snippet',
                    q: query,
                    type: 'video',
                    maxResults: 5,
                    key: apiKey,
                },
            });

            if (response.data.items && response.data.items.length > 0) {
                const video = response.data.items[0];
                return {
                    videoId: video.id.videoId,
                    title: video.snippet.title,
                    thumbnail: video.snippet.thumbnails.default.url,
                    channel: video.snippet.channelTitle,
                };
            }

            return null;
        } catch (error) {
            console.error('YouTube search error:', error);
            return null;
        }
    },

    // Get YouTube video URL
    getVideoUrl: (videoId: string) => {
        return `https://www.youtube.com/watch?v=${videoId}`;
    },

    // Get embed URL for player
    getEmbedUrl: (videoId: string, autoplay: boolean = false) => {
        return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}`;
    },
};
