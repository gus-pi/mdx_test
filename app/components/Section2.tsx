'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/all';
import { Environment } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from 'react';
import { Group } from 'three';
import gsap from 'gsap';
import { Swan } from './3D/Swan';
import Card from './ui/Card';
import Image from 'next/image';

const CARDS = [
    {
        text: 'Swanson Reserve Capital is private investment fund with dual Share Classes, Structured Notes & Long Equity Quantitative investing.What we do: Our fund curates investment strategies for accredited investors, family offices, institutions, endowments and businesses to help:',
        url: '/img1.png',
    },

    {
        text: '1. Create Quarterly Income: Pay ongoing expenses, kids tuition, mortgages, car payments, private jet, or fund charitable contributions.',
        url: '/section2_img2.png',
    },

    {
        text: '2. Achieve Long Term Growth: While still receiving quarterly distributions, our Growth Notes and Equity Allocations are designed to accumulate long term wealth.',
        url: '/img1.png',
    },

    {
        text: '3. Capital Preservation: Both investment Share Classes are designed to shield our investors from large market downturns. Our Structured Products all come with barrier protections of up to 50% while our Equity Portfolio is designed to achieve risk adjusted returns above S&P 500 with lower beta risks.',
        url: '/section2_img2.png',
    },
];

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pinnedRef = useRef<HTMLDivElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    const [scrollGroup, setScrollGroup] = useState<Group | null>(null);
    const [idleGroup, setIdleGroup] = useState<Group | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const idleSpinTween = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    useGSAP(
        () => {
            if (!containerRef.current || !pinnedRef.current || !scrollGroup || !idleGroup) return;

            const mobile = window.innerWidth < 768;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    scrub: 1,
                    pin: pinnedRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    onUpdate: (self) => {
                        if (idleSpinTween.current) {
                            idleSpinTween.current.timeScale(self.direction);
                        }
                    },
                },
            });

            tl.fromTo(
                scrollGroup.position,
                { x: mobile ? 3 : 5 },
                { x: 0, duration: 1, ease: 'power1.inOut' },
            );

            const cards = ['.c1', '.c2', '.c3', '.c4'];
            cards.forEach((card, i) => {
                const isLeft = i % 2 === 0;
                const startTime = i * 0.7;

                tl.fromTo(
                    card,
                    {
                        y: '120vh',
                        x: isLeft ? (mobile ? '-5%' : '-10%') : mobile ? '5%' : '10%',
                    },
                    {
                        y: '-120vh',
                        x: isLeft ? (mobile ? '10%' : '25%') : mobile ? '-10%' : '-25%',
                        duration: 3,
                        ease: 'none',
                    },
                    startTime,
                );

                tl.fromTo(
                    card,
                    { rotation: isLeft ? 10 : -10 },
                    { rotation: 0, duration: 1, ease: 'power2.inOut' },
                    startTime,
                );
            });

            // 3. Swan Rotation
            tl.to(
                scrollGroup.rotation,
                {
                    y: Math.PI * 10,
                    duration: 3,
                    ease: 'power2.in',
                },
                0,
            );

            tl.to(
                [canvasContainerRef.current, backgroundRef.current],
                {
                    opacity: 0,
                    duration: 1,
                    ease: 'power1.in',
                },
                3.5,
            );

            // Idle spin
            idleSpinTween.current = gsap.to(idleGroup.rotation, {
                y: `+=${Math.PI * 2}`,
                duration: 5,
                ease: 'none',
                repeat: -1,
                timeScale: 0,
            });
        },
        { scope: containerRef, dependencies: [scrollGroup, idleGroup] },
    );

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-black">
            <div ref={pinnedRef} className="h-screen relative z-10">
                {/* Background Ellipses  */}
                <div
                    ref={backgroundRef}
                    className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
                >
                    {/* Top Ellipse */}
                    <div className="absolute top-0 left-0 w-full max-w-2xl md:max-w-5xl opacity-64">
                        <Image
                            src="/ellipse_121.png"
                            alt=""
                            width={1024}
                            height={1080}
                            priority
                            className="w-full h-auto"
                        />
                    </div>
                    {/* Bottom Ellipse */}
                    <div className="absolute bottom-0 right-0 w-full max-w-5xl opacity-64">
                        <Image
                            src="/ellipse_122.png"
                            alt=""
                            width={1033}
                            height={1080}
                            className="w-full h-auto"
                        />
                    </div>
                </div>
                {/* Cards Layer */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {CARDS.map((card, i) => (
                        <div
                            key={i}
                            className={`c${i + 1} absolute ${i % 2 === 0 ? 'left-10 md:left-0' : 'right-10 md:right-20'}`}
                        >
                            <Card text={card.text} url={card.url} textUnder={i % 2 !== 0} />
                        </div>
                    ))}
                </div>

                {/* 3D Layer */}
                <div ref={canvasContainerRef} className="absolute inset-0 z-20 pointer-events-none">
                    <Canvas camera={{ position: [0, 0, isMobile ? 10 : 5], fov: 35 }}>
                        <group ref={setScrollGroup}>
                            <group ref={setIdleGroup}>
                                <Swan />
                            </group>
                        </group>
                        <Environment preset="city" environmentIntensity={1.5} />
                    </Canvas>
                </div>
            </div>
        </div>
    );
};

export default Section2;
