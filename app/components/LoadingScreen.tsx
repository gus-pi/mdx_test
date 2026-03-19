'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface LoadingScreenProps {
    isLoaded: boolean;
}

const LoadingScreen = ({ isLoaded }: LoadingScreenProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!logoRef.current) return;
        const pulse = gsap.to(logoRef.current, {
            scale: 1.1,
            duration: 1,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1,
        });
        return () => {
            pulse.kill();
        };
    }, []);

    useEffect(() => {
        if (!isLoaded || !containerRef.current) return;

        const tl = gsap.timeline({
            onComplete: () => {
                if (containerRef.current) {
                    containerRef.current.style.display = 'none';
                }
            },
        });

        tl.to(logoRef.current, {
            scale: 1.2,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.in',
        }).to(
            containerRef.current,
            {
                autoAlpha: 0,
                duration: 0.5,
                ease: 'power2.inOut',
            },
            '-=0.2',
        );
    }, [isLoaded]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-100 bg-black flex items-center justify-center"
        >
            <div ref={logoRef}>
                <Image
                    src="/swanson_logo.png"
                    alt="Loading"
                    width={240}
                    height={195}
                    unoptimized
                    priority
                />
            </div>
        </div>
    );
};

export default LoadingScreen;
