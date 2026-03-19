'use client';

import { useEffect, useRef } from 'react';
import { fitContent, remap } from './math';
import { gsap } from 'gsap';

const SEQUENCES = {
    desktop: { folder: 'sequence_desktop', frames: 255 },
    mobile: { folder: 'sequence_mobile', frames: 238 },
};

interface ImageSequenceProps {
    progress: React.RefObject<number>;
    onLoaded?: () => void;
}

export function ImageSequence({ progress, onLoaded }: ImageSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !progress) return;

        function resizeCanvas() {
            if (!canvas) return;
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const ctx = canvas.getContext('2d');
        const isMobile = window.innerWidth < 768;
        const { folder, frames } = isMobile ? SEQUENCES.mobile : SEQUENCES.desktop;

        const images: Record<number, HTMLImageElement> = {};
        let loadedCount = 0;

        for (let index = 0; index < frames; index++) {
            const img = new window.Image();
            const frame = index.toString().padStart(5, '0');
            img.src = `/${folder}/swanson__${frame}.webp`;
            img.onload = () => {
                images[index] = img;
                loadedCount++;
                if (loadedCount >= frames) {
                    onLoaded?.();
                }
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount >= frames) {
                    onLoaded?.();
                }
            };
        }

        gsap.ticker.add(() => {
            if (!canvas) return;

            let frameNumber = remap(progress.current, 0, 1, 0, frames);
            frameNumber = Math.round(frameNumber);

            const img = images[frameNumber];

            if (!img) return;

            const { x, y, width, height } = fitContent(
                canvas.width,
                canvas.height,
                img.width,
                img.height,
            );

            ctx?.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
            ctx?.drawImage(img, x, y, width, height);
        });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-screen h-screen z-0" />;
}
