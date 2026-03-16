'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const slidesRef = useRef([]);
    const titlesRef = useRef([]);
    const progressRef = useRef(null);
    const scrollIndicatorRef = useRef(null);
    return <div>Hero</div>;
};
export default Hero;
