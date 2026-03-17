'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

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
        label: 'Swanson Reserve Capital Is',
        headline: ['Prosperity', 'Protected'],
        counter: '03',
    },
    // Slide 3 — centred, no label, no counter
    {
        label: null,
        headline: ['+ We are', 'Swanson Reserve'],
        counter: null,
    },
];

const SCROLL_HEIGHT = '550vh';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef}>
            <div
                ref={triggerRef}
                className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden border-20 border-gray-800"
            >
                <div className="fixed inset-0 z-60 pointer-events-none">
                    {/*Rounded vignette*/}
                    <div className="absolute inset-0 border-16 md:border-25 border-gray-800  rounded-[40px] md:rounded-[60px]" />
                </div>
                {/* IMAGE PLACEHOLDER */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                        src="/swanson__00000.jpg"
                        alt="Hero Background"
                        fill
                        priority
                        className="object-cover"
                    />
                    {/* Optional: Dark overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="absolute inset-0 z-10 w-full text-white overflow-hidden flex items-end">
                    {/*Label and title and progress indicator*/}
                    <div className="p-16">
                        {/* Label */}
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-22.75 h-px bg-white/60" />
                            <span className="text-[30px] font-light text-white/80">
                                Market Capitalization Company
                            </span>
                        </div>

                        {/* Main title*/}
                        <div className="flex flex-col md:flex-row md:items-end gap-8">
                            <h1 className="text-6xl md:text-[150px] font-medium tracking-tight leading-[0.9]">
                                Swanson <br /> Reserve Capital
                            </h1>

                            {/* Small text */}
                            {/* <div className="mb-4 text-white/40 text-[10px] md:text-xs uppercase tracking-widest leading-relaxed">
                                <p>Accredited Investors only.</p>
                                <p>99 spots available</p>
                            </div> */}
                        </div>
                        {/*  Progress Indicator */}
                        <div className="flex items-center gap-8 mt-20 ">
                            <div className="flex items-center gap-8 text-[20px]">
                                <span className=" font-medium tracking-tighter">01</span>
                                <div className="relative w-28.5 h-px bg-white/20 overflow-hidden">
                                    <div className="absolute left-0 top-0 w-1/3 h-full bg-white" />
                                </div>
                                <span className=" text-white/40 tracking-tighter">02</span>
                                <span className=" text-white/40 tracking-tighter">03</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Vertical scroll indicator */}
                <div className="absolute right-0 bottom-0 z-10 flex flex-col items-center gap-8 bg-[#6C6C6C33] backdrop-blur-sm rounded-tl-2xl p-4 px-8 ">
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

            {/* Space for the next section */}
            <div className="h-screen bg-white flex items-center justify-center">
                <h2 className="text-black text-4xl">Next Section Starts Here</h2>
            </div>
        </div>
    );
}
