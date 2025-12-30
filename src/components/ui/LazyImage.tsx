import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    placeholderColor?: string;
    blurHash?: string; // Future proofing
}

export const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    className,
    placeholderColor = 'rgba(255,255,255,0.05)',
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSrc, setCurrentSrc] = useState<string | undefined>(undefined);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setCurrentSrc(src);
            setIsLoaded(true);
        };
    }, [src]);

    return (
        <div className={cn("relative overflow-hidden", className)} style={{ backgroundColor: placeholderColor }}>
            {/* Blurred placeholder or background is handled by container style + opacity transition */}
            <img
                src={currentSrc || src} // If not loaded, browser might show broken or loading, but we hide it via opacity
                alt={alt}
                className={cn(
                    "w-full h-full object-cover transition-all duration-700 ease-in-out",
                    isLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-xl scale-110"
                )}
                loading="lazy"
                {...props}
            />
        </div>
    );
};
