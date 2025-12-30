import { ExternalLink, Youtube } from 'lucide-react';
import { cn } from '../../lib/utils';

interface YouTubeLinkProps {
    videoId: string;
    className?: string;
}

export default function YouTubeLink({ videoId, className = "" }: YouTubeLinkProps) {
    return (
        <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-300",
                className
            )}
        >
            <Youtube className="w-4 h-4" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Watch Video</span>
            <ExternalLink className="w-3 h-3" />
        </a>
    );
}
