export function LoadingSkeleton() {
    return (
        <div className="min-h-screen bg-[#030014] flex items-center justify-center">
            <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping" />
                    <div
                        className="absolute inset-2 rounded-full border-2 border-cyan-500/30 animate-ping"
                        style={{ animationDelay: '0.3s' }}
                    />
                    <div
                        className="absolute inset-4 rounded-full border-2 border-pink-500/30 animate-ping"
                        style={{ animationDelay: '0.6s' }}
                    />
                    {/* Center dot */}
                    <div className="absolute inset-6 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse" />
                </div>

                <p className="text-gray-500 text-sm tracking-widest uppercase animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="aspect-square rounded-2xl skeleton" />
    );
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    );
}

export default LoadingSkeleton;
