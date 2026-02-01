"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";

export function Footer() {
    const container = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const { contextSafe } = useGSAP({ scope: container });

    // Move image with cursor using quickSetter for performance
    const moveImage = contextSafe((e: React.MouseEvent) => {
        if (!imageRef.current || !activeCategory) return;

        // Offset Y by -120px to make it appear above the cursor/span
        gsap.to(imageRef.current, {
            x: e.clientX,
            y: e.clientY - 100,
            duration: 0.8,
            ease: "power3.out",
        });
    });

    const handleMouseEnter = contextSafe((category: string) => {
        setActiveCategory(category);
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "back.out(1.7)",
            });
        }
    });

    const handleMouseLeave = contextSafe(() => {
        setActiveCategory(null);
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
            });
        }
    });

    return (
        <>
            {/* Floating Image Container - Moved outside footer to escape stacking context */}
            <div
                ref={imageRef}
                className="fixed top-0 left-0 pointer-events-none z-[100] overflow-hidden rounded-lg w-[200px] h-[150px] opacity-0 scale-0 origin-center -translate-x-1/2 -translate-y-1/2"
            >
                <Image
                    src="/project-preview.png"
                    alt="Project Preview"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                />
            </div>

            <footer
                ref={container}
                onMouseMove={moveImage}
                className="absolute bottom-0 left-0 w-full bg-[var(--beatriz-gray)] py-4 px-6 md:px-10 grid grid-cols-2 md:flex md:justify-between gap-4 text-xs md:text-sm z-20 border-t border-black/5 text-[var(--beatriz-blue)]"
            >
                <span
                    onMouseEnter={() => handleMouseEnter("Editorial")}
                    onMouseLeave={handleMouseLeave}
                    className="relative z-50 text-center md:text-left cursor-pointer hover:font-bold transition-all text-[var(--beatriz-blue)]"
                >
                    Editorial
                </span>
                <span
                    onMouseEnter={() => handleMouseEnter("Motion Graphics")}
                    onMouseLeave={handleMouseLeave}
                    className="relative z-50 text-center cursor-pointer hover:font-bold transition-all text-[var(--beatriz-blue)]"
                >
                    Motion graphics
                </span>
                <span
                    onMouseEnter={() => handleMouseEnter("Illustrations")}
                    onMouseLeave={handleMouseLeave}
                    className="relative z-50 text-center cursor-pointer hover:font-bold transition-all text-[var(--beatriz-blue)]"
                >
                    Ilustrations
                </span>
                <span
                    onMouseEnter={() => handleMouseEnter("Visual Identity")}
                    onMouseLeave={handleMouseLeave}
                    className="relative z-50 text-center md:text-right cursor-pointer hover:font-bold transition-all text-[var(--beatriz-blue)]"
                >
                    Visual identity
                </span>
            </footer>
        </>
    );
}
