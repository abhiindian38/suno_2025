import { useState, useCallback, type MouseEvent } from 'react';

interface TiltValues {
    x: number;
    y: number;
}

export const useTilt = (maxRotation: number = 15) => {
    const [tilt, setTilt] = useState<TiltValues>({ x: 0, y: 0 });

    const onMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.

        // Calculate rotation:
        // Rotate X based on Y position (if cursor is at top, tilt up)
        // Rotate Y based on X position (if cursor is right, tilt right)

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Normalize values between -1 and 1
        // Let's test standard: Tilt UP when cursor is TOP. 
        // css rotateX(positive) tilts top AWAY. rotateX(negative) tilts top TOWARDS.
        // If mouse is TOP (y < centerY), we want top to go screen-in (away) or screen-out?
        // Usually "Look at" effect means top comes towards if mouse is top? No, usually it tilts towards the mouse.
        // Let's implement standard "transform-style: preserve-3d" logic.

        const rotateXVal = ((y - centerY) / centerY) * maxRotation * -1; // Inverted Y for X axis rotation
        const rotateYVal = ((x - centerX) / centerX) * maxRotation;

        setTilt({ x: rotateXVal, y: rotateYVal });
    }, [maxRotation]);

    const onMouseLeave = useCallback(() => {
        setTilt({ x: 0, y: 0 });
    }, []);

    return { tilt, onMouseMove, onMouseLeave };
};
