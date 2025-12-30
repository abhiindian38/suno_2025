import React, { useRef, useEffect } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    size: number;
    color: string;
}

interface ParticleSystemProps {
    isActive: boolean;
    className?: string;
    color?: string;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ isActive, className, color = '#ffffff' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const animationFrameId = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize observer to handle container size changes
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                // Set canvas internal resolution to match display size
                canvas.width = entry.contentRect.width;
                canvas.height = entry.contentRect.height;
            }
        });

        resizeObserver.observe(canvas.parentElement || document.body);

        const spawnParticle = () => {
            if (!canvas) return;
            const x = Math.random() * canvas.width;
            const y = canvas.height + 10; // Start slightly below
            const size = Math.random() * 2 + 1;
            // Float upwards with slight horizontal drift
            const vx = (Math.random() - 0.5) * 1;
            const vy = -(Math.random() * 1 + 0.5);
            const life = 1.0;

            particles.current.push({ x, y, vx, vy, life, size, color });
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Spawn new particles if active
            if (isActive && particles.current.length < 50) {
                if (Math.random() > 0.8) { // Chance to spawn
                    spawnParticle();
                }
            }

            // Update and draw existing particles
            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.01;

                if (p.life <= 0) {
                    particles.current.splice(i, 1);
                    continue;
                }

                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId.current);
            resizeObserver.disconnect();
        };
    }, [isActive, color]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ pointerEvents: 'none' }}
        />
    );
};
