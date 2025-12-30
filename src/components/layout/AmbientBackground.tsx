

export const AmbientBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[100px] animate-float opacity-50 mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-secondary/10 blur-[120px] animate-float opacity-40 mix-blend-screen" style={{ animationDelay: '-2s' }} />
            <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-accent/10 blur-[80px] animate-pulse-glow opacity-30 mix-blend-screen" style={{ animationDelay: '-4s' }} />

            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-80" />

            {/* Grain/Noise texture for cinematic feel */}
            <div className="absolute inset-0 opacity-[0.03] bg-noise" />

            {/* Scanline Effect */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-[0.02]">
                <div className="w-full h-[20%] bg-gradient-to-b from-transparent via-white to-transparent animate-scan" />
            </div>
        </div>
    );
};
