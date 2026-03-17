'use client';
import { useRef, useEffect, useState } from 'react';

interface Props {
    borderWidth?: number;
    cornerRadius?: number;
    borderColor?: string;
    children: React.ReactNode;
}

export default function FrameBorder({
    borderWidth = 24,
    cornerRadius = 48,
    borderColor = '#111827', // gray-900
    children,
}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });

    useEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(([entry]) => {
            setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
        });
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, []);

    const { w, h } = size;
    const b = borderWidth;
    const r = cornerRadius;

    // Frame path: outer rectangle minus inner rounded rectangle
    // Uses the SVG even-odd fill rule to "punch out" the inner area
    const framePath =
        w && h
            ? `
    M 0 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z
    M ${b + r} ${b}
    L ${w - b - r} ${b}
    Q ${w - b} ${b} ${w - b} ${b + r}
    L ${w - b} ${h - b - r}
    Q ${w - b} ${h - b} ${w - b - r} ${h - b}
    L ${b + r} ${h - b}
    Q ${b} ${h - b} ${b} ${h - b - r}
    L ${b} ${b + r}
    Q ${b} ${b} ${b + r} ${b}
    Z
  `
            : '';

    // Corner "bite" paths — inverted concave corners
    // Each one fills the small square in each corner with the border color,
    // with a circular bite taken out pointing inward
    const corners =
        w && h
            ? [
                  // top-left: square at (0,0) with quarter-circle cut pointing toward center
                  `M 0 0 L ${b} 0 Q 0 0 0 ${b} Z`,
                  // top-right
                  `M ${w} 0 L ${w - b} 0 Q ${w} 0 ${w} ${b} Z`,
                  // bottom-right
                  `M ${w} ${h} L ${w - b} ${h} Q ${w} ${h} ${w} ${h - b} Z`,
                  // bottom-left
                  `M 0 ${h} L ${b} ${h} Q 0 ${h} 0 ${h - b} Z`,
              ]
            : [];

    return (
        <div ref={ref} className="relative w-full h-full">
            {children}

            {w > 0 && (
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-20"
                    viewBox={`0 0 ${w} ${h}`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Main frame with hole punched out */}
                    <path d={framePath} fill={borderColor} fillRule="evenodd" />
                    {/* Concave corner fills */}
                    {corners.map((d, i) => (
                        <path key={i} d={d} fill={borderColor} />
                    ))}
                </svg>
            )}
        </div>
    );
}
