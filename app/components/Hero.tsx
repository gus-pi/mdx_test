'use client';

import { useGSAP } from '@gsap/react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Crosshair from './ui/Crosshair';
import { FaArrowDown } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
    {
        label: 'Market Capitalization Company',
        headline: ['Swanson', 'Reserve Capital'],
        counter: '01',
    },
    {
        label: 'Swanson Reserve Capital Is',
        headline: ['Innovation', 'Invested'],
        counter: '02',
    },
    {
        label: 'Swanson Reserve Capital Means',
        headline: ['Prosperity', 'Protected'],
        counter: '03',
    },
    // // Slide 3 — centred, no label, no counter
    // {
    //     label: null,
    //     headline: ['+ We are', 'Swanson Reserve'],
    //     counter: '04',
    // },
];

const SCROLL_HEIGHT = '400vh';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const pinnedRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    scrub: true,
                    pin: pinnedRef.current,
                    start: 'top top',
                    end: '+=300%',
                },
            });

            // --- SLIDE 01 ---
            tl.from('.label01', { opacity: 0, duration: 1 })
                .from('.headline01', { opacity: 0, duration: 1 }, '<')

                .to('.label01', { opacity: 0, duration: 1 })
                .to('.headline01', { x: 1500, opacity: 0, duration: 1 }, '<');

            // --- SLIDE 02 ---
            tl.from('.label02', { opacity: 0, duration: 1 }, '-=0.5')
                .from(
                    '.headline02',
                    {
                        x: -800,
                        duration: 1,
                    },
                    '<',
                )
                //HOLD
                .to({}, { duration: 0.5 })

                .to('.label02', { opacity: 0, duration: 1 })
                .to('.headline02', { x: 1500, opacity: 0, duration: 1 }, '<');

            // --- SLIDE 03 ---

            tl.from('.label03', { opacity: 0, duration: 1 }, '-=0.5')
                .from(
                    '.headline03',
                    {
                        x: -800,
                        duration: 1,
                    },
                    '<',
                )

                //HOLD
                .to({}, { duration: 0.5 })

                .to('.label03', { opacity: 0, duration: 1 })
                .to('.headline03', { x: -800, opacity: 0, duration: 1 }, '<');

            tl.from(
                '.headline_main',
                {
                    y: 600,
                    opacity: 0,
                    duration: 1,
                },
                '+=1',
            ).to({}, { duration: 2 });
        },
        {
            scope: containerRef,
        },
    );

    return (
        <>
            <div ref={containerRef} className={`h-[${SCROLL_HEIGHT}]`}>
                {/* <ImageSequence /> */}
                <div ref={pinnedRef} className="h-screen z-10">
                    <div ref={triggerRef} className="relative w-full h-full z-15 overflow-clip ">
                        <div className="inset-0 z-60 pointer-events-none">
                            {/*Rounded vignette*/}
                            <div className="absolute inset-0  rounded-[40px] md:rounded-[60px]" />
                        </div>

                        <div className="absolute inset-0 z-20 w-full text-white overflow-hidden flex items-end">
                            <section className="title p-16 ">
                                {SLIDES.map((slide, i) => (
                                    <div
                                        key={slide.counter}
                                        className="absolute inset-0 flex flex-col justify-end px-6"
                                    >
                                        {/* Label */}
                                        {slide.label && (
                                            <div
                                                className={`label${slide.counter} flex items-center gap-6 mb-6`}
                                            >
                                                <div className="w-24 h-px bg-white/60" />
                                                <span className="text-[20px] md:text-[30px] font-light text-white/80 uppercase tracking-widest">
                                                    {slide.label}
                                                </span>
                                            </div>
                                        )}

                                        {/* Title */}
                                        <h1
                                            className={`headline${slide.counter} text-6xl md:text-[150px] font-medium tracking-tight leading-[0.85] mb-24`}
                                        >
                                            {slide.headline[0]} <br /> {slide.headline[1]}
                                        </h1>
                                    </div>
                                ))}

                                {/* Main Title */}
                                <div className="headline_main absolute inset-0 z-30 flex items-end justify-center pointer-events-none">
                                    <h1 className="text-6xl text-center md:text-[150px] font-medium tracking-tight leading-[0.85] flex flex-col items-center">
                                        <span className="flex items-center gap-4 md:gap-8">
                                            <Crosshair
                                                size={120}
                                                strokeWidth={1.5}
                                                className="w-[0.5em] h-[0.5em] md:w-[0.7em] md:h-[0.7em]"
                                            />
                                            <span>We are</span>
                                        </span>
                                        <span>Swanson Reserve</span>
                                        <span className="flex flex-col items-center gap-4 py-10">
                                            <span className="uppercase text-[20px] font-light tracking-normal">
                                                Scroll to Explore
                                            </span>
                                            <FaArrowDown className="w-6 h-6" />
                                        </span>
                                    </h1>
                                </div>

                                {/*  Progress Indicator */}
                                {/* <div className="flex items-center gap-8 mt-20 ">
                                    <div className="flex items-center gap-8 text-[20px]">
                                        <span className=" font-medium tracking-tighter">01</span>
                                        <div className="relative w-28.5 h-px bg-white/20 overflow-hidden">
                                            <div className="absolute left-0 top-0 w-1/3 h-full bg-white" />
                                        </div>
                                        <span className=" text-white/40 tracking-tighter">02</span>
                                        <span className=" text-white/40 tracking-tighter">03</span>
                                    </div>
                                </div> */}
                            </section>
                        </div>
                        {/* Vertical scroll indicator */}
                        <div className="absolute right-0 bottom-0 z-10 flex flex-col items-center gap-8 bg-[#6C6C6C33] backdrop-blur-sm rounded-t-2xl p-4 px-8 ">
                            <span
                                className="uppercase tracking-[0.4em] text-[17px] text-white/80"
                                style={{ writingMode: 'sideways-lr' }}
                            >
                                Scroll
                            </span>
                            <svg
                                width="24"
                                height="268"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                className="opacity-50"
                            >
                                <path
                                    fill="white"
                                    d="M12 265.883l6.235-7.527.765.644-7.521 9-7.479-9 .764-.645 6.236 7.529v-265.884h1v265.883z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            {/* Space for the next section */}
            <div className="relative z-10 h-screen bg-white flex items-center justify-center">
                <h2 className="text-black text-4xl">Next Section Starts Here</h2>
            </div>
        </>
    );
}
