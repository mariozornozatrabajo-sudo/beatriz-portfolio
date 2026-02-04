"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";

export function Footer() {
    const container = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const activeCategory = useRef<string | null>(null);
    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);

    const { contextSafe } = useGSAP(
        () => {
            if (!imageRef.current) return;
            // Setup quickTo for performance
            xTo.current = gsap.quickTo(imageRef.current, "x", { duration: 0.8, ease: "power3.out" });
            yTo.current = gsap.quickTo(imageRef.current, "y", { duration: 0.8, ease: "power3.out" });
        },
        { scope: container }
    );

    // Move image with cursor using quickTo
    const moveImage = contextSafe((e: React.MouseEvent) => {
        if (!imageRef.current || !activeCategory.current) return;

        // Use quickTo if available
        if (xTo.current && yTo.current) {
            xTo.current(e.clientX);
            yTo.current(e.clientY - 100);
        }
    });

    const handleMouseEnter = contextSafe((category: string) => {
        activeCategory.current = category;
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "back.out(1.7)",
                overwrite: true,
            });
        }
    });

    const handleMouseLeave = contextSafe(() => {
        activeCategory.current = null;
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                overwrite: true,
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
