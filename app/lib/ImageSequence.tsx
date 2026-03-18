'use client';

import { useEffect, useRef } from 'react';
import { fitContent, remap } from './math';
import { gsap } from 'gsap';

export function ImageSequence({ progress }: { progress: React.RefObject<number> }) {
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

        const images: Record<number, HTMLImageElement> = {};

        for (let index = 0; index < 255; index++) {
            const img = new Image();

            const frame = index.toString().padStart(5, '0');
            const imageCode = `swanson__${frame}`;

            img.src = `/sequence_desktop/${imageCode}.webp`;
            img.onload = () => {
                images[index] = img;
            };
        }

        gsap.ticker.add(() => {
            if (!canvas) return;

            let frameNumber = remap(progress.current, 0, 1, 0, 255);
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
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-screen h-screen z-0" />;
}
