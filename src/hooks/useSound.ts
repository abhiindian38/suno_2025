import { useRef, useCallback } from 'react';

const VOLUMES = {
    hover: 0.2,
    click: 0.5,
    ambient: 0.1,
};

// Simple synthesizer for UI sounds to avoid external assets for now
const createOscillator = (type: OscillatorType, freq: number, duration: number, vol: number, ctx: AudioContext) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
};

export const useSound = () => {
    const audioContext = useRef<AudioContext | null>(null);

    const initAudio = useCallback(() => {
        if (!audioContext.current) {
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            audioContext.current = new AudioContextClass();
        }
        if (audioContext.current.state === 'suspended') {
            audioContext.current.resume();
        }
    }, []);

    const playHover = useCallback(() => {
        if (!audioContext.current) return;
        // High pitched short sine wave
        createOscillator('sine', 800, 0.1, VOLUMES.hover, audioContext.current);
    }, []);

    const playClick = useCallback(() => {
        if (!audioContext.current) initAudio();
        if (!audioContext.current) return;
        // Lower pitched triangle wave
        createOscillator('triangle', 300, 0.15, VOLUMES.click, audioContext.current);
    }, [initAudio]);

    const playAmbient = useCallback(() => {
        // Placeholder for ambient loop - using a very low freq oscillator for drone effect
        if (!audioContext.current) return;
        const osc = audioContext.current.createOscillator();
        const gain = audioContext.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(50, audioContext.current.currentTime);
        osc.connect(gain);
        gain.connect(audioContext.current.destination);
        gain.gain.value = 0.02; // Very quiet
        osc.start();
        return osc; // Return to stop later if needed
    }, []);

    return { initAudio, playHover, playClick, playAmbient };
};
