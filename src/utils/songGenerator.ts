export const generateSongsForMovie = (movieTitle: string, movieId: number) => {
    // Use movieId as seed for random but consistent generation
    let seed = movieId;
    const seededRandom = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    const songTemplates = [
        "Main Theme", "Love Theme", "Action Sequence",
        "End Credits", "Opening Titles", "Character Theme",
        "Battle Music", "Emotional Score", "Chase Scene",
        "Final Confrontation", "Victory Theme", "Sorrow",
        "Ambient Drift", "Pulse of the City", "Hero's Journey"
    ];

    const composers = [
        "Hans Zimmer", "John Williams", "A.R. Rahman",
        "Devi Sri Prasad", "S.S. Thaman", "Anirudh Ravichander",
        "M.M. Keeravani", "Hesham Abdul Wahab", "Shankar-Ehsaan-Loy",
        "Ludwig Göransson", "Michael Giacchino", "Hildur Guðnadóttir"
    ];

    const genres = [
        "Epic", "Orchestral", "Electronic", "Ambient", "Rock", "Pop", "Classical"
    ];

    // Return 6 unique songs for this specific movie
    const songs = [];

    // Shuffle templates loosely based on seed
    const usedTemplates = new Set<string>();

    for (let i = 0; i < 6; i++) {
        let templateIndex = Math.floor(seededRandom() * songTemplates.length);
        let template = songTemplates[templateIndex];

        // Simple collision avoidance
        while (usedTemplates.has(template)) {
            templateIndex = (templateIndex + 1) % songTemplates.length;
            template = songTemplates[templateIndex];
        }
        usedTemplates.add(template);

        const composerIndex = Math.floor(seededRandom() * composers.length);
        const genreIndex = Math.floor(seededRandom() * genres.length);

        const minutes = 2 + Math.floor(seededRandom() * 3); // 2-4 minutes
        const seconds = Math.floor(seededRandom() * 60).toString().padStart(2, '0');

        songs.push({
            id: `gen-${movieId}-${i}`,
            title: `${movieTitle}: ${template}`,
            artist: composers[composerIndex],
            duration: `${minutes}:${seconds}`,
            youtubeId: '', // Will be generated
            genre: genres[genreIndex]
        });
    }

    return songs;
};
