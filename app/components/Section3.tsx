'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import gsap from 'gsap';
import Image from 'next/image';

const CARDS = [
    { name: 'Kraig Swanson', role: 'Founder - Managing Partner', image: '/team/team1.png' },
    { name: 'John Johnson', role: 'Partner - Head of Strategy', image: '/team/team2.png' },
    { name: 'Jack Jackson', role: 'Partner - Creative Director', image: '/team/team3.png' },
    { name: 'Bob Bobson', role: 'Partner - Chief of Operations', image: '/team/team4.png' },
    { name: 'Bill Billson', role: 'Partner - Technical Advisor', image: '/team/team5.png' },
    { name: 'Jane Janeson', role: 'Partner - Head of Engineering', image: '/team/team6.png' },
];

const TeamSection = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'center',
        loop: true,
        slidesToScroll: 1,
    });
    const [active, setActive] = useState(0);

    const animate = useCallback(() => {
        if (!emblaApi) return;

        const isMobile = window.innerWidth < 768;
        const progress = emblaApi.scrollProgress();
        const snaps = emblaApi.scrollSnapList();
        const slidesCount = CARDS.length;
        const slideNodes = emblaApi.slideNodes();

        const rawIndex = progress * slidesCount;
        const virtualActive = Math.round(rawIndex) % slidesCount;

        slideNodes.forEach((slide, i) => {
            const card = slide.firstElementChild;
            if (!card) return;

            let dist = snaps[i] - progress;
            if (dist > 0.5) dist -= 1;
            if (dist < -0.5) dist += 1;

            const absDist = Math.abs(dist);

            // Visibility: exactly 3 cards
            let indexDiff = Math.abs(i - virtualActive);
            if (indexDiff > slidesCount / 2) indexDiff = slidesCount - indexDiff;
            const isVisible = indexDiff <= 1;
            const isCenter = absDist < 0.05;

            // Overlap logic:
            // - Center card: scale 1, z-index 30, x: 0
            // - Side cards: scale 0.85 (smaller), z-index 20, x: pulled toward center
            // The x offset is reduced to create overlap (was -150, now -40)

            gsap.to(card, {
                opacity: isVisible ? 1 : 0,
                scale: isCenter ? 1 : 0.85,
                x: dist * -350,
                skewY: dist * 15,
                zIndex: isCenter ? 30 : 20, // Center always on top
                duration: 0.3,
                ease: 'power2.out',
                overwrite: true,
            });

            // Images: sides fill 100%, center shows 65% (revealing info below)
            const img = card.querySelector('.card-img');
            if (img) {
                gsap.to(img, {
                    height: isCenter ? (isMobile ? '75%' : '65%') : '100%',
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: true,
                });
            }

            // Info: only center
            const info = card.querySelector('.card-info');
            if (info) {
                gsap.to(info, {
                    opacity: isCenter ? 1 : 0,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: true,
                });
            }
        });
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('scroll', animate);
        emblaApi.on('select', () => setActive(emblaApi.selectedScrollSnap()));
        animate();
        return () => {
            emblaApi.off('scroll', animate);
        };
    }, [emblaApi, animate]);

    return (
        <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center py-20 select-none bg-black">
            <h2 className="text-5xl md:text-7xl font-medium text-center text-[#f5f0e8] max-w-90 md:max-w-202 tracking-tight mb-12 ">
                We are <span className="text-[#AA7F2C]">Swanson</span>
            </h2>

            <div className="relative w-full max-w-275 px-4">
                <div
                    ref={emblaRef}
                    className="overflow-hidden cursor-grab active:cursor-grabbing py-10"
                >
                    <div className="flex -ml-4">
                        {CARDS.map((card, i) => (
                            <div key={i} className="min-w-0 pl-4 flex-[0_0_70%] md:flex-[0_0_35%]">
                                <div
                                    onClick={() => emblaApi?.scrollTo(i)}
                                    className="h-110 md:h-137.5 rounded-3xl overflow-hidden backdrop-blur-xl bg-[#282828] flex flex-col cursor-pointer will-change-transform relative shadow-2xl"
                                >
                                    <div className="card-img relative w-full h-full rounded-3xl overflow-hidden shrink-0">
                                        <Image
                                            src={card.image}
                                            alt={card.name}
                                            fill
                                            sizes="400px"
                                            className="object-cover object-top"
                                            priority={i < 3}
                                        />
                                    </div>

                                    <div className="card-info absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 py-8 px-5 opacity-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                        <h3 className="text-2xl md:text-4xl font-bold text-[#f5f0e8] font-serif">
                                            {card.name}
                                        </h3>
                                        <p className="text-xs md:text-sm text-cennter tracking-widest">
                                            {card.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-50 md:bottom-65 right-[10%] md:right-[25%] z-40 w-24 h-24 md:w-45 md:h-45 rounded-full bg-[#AA7F2C] flex items-center justify-center text-[16px] md:text-[29px]  tracking-widest text-black pointer-events-none">
                    DRAG
                </div>

                <div className="absolute bottom-6 md:bottom-4 left-1/2 -translate-x-1/2 w-70 h-8 md:w-125 md:h-12.5 rounded-[50%] border-2 border-[#AA7F2C]/80 pointer-events-none z-40" />
            </div>
        </section>
    );
};

export default TeamSection;
