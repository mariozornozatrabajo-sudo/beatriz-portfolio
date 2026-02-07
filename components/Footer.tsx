"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { GlitchText } from "./GlitchText";
import { useRef, useState } from "react";

const categoryImages: Record<string, string> = {
    "Editorial": "/img-proyectos/eternoretorno-editorial.png",
    "Motion Graphics": "/img-proyectos/memories-motion.png",
    "Illustrations": "/img-proyectos/nudo-editorial.png",
    "Visual Identity": "/img-proyectos/teatrocanal-identidad.jpg"
};

export function Footer() {
    const container = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const activeCategory = useRef<string | null>(null);
    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);
    const [currentImage, setCurrentImage] = useState("/img-proyectos/eternoretorno-editorial.png");

    const { contextSafe } = useGSAP(
        () => {
            if (!imageRef.current) return;

            // Set initial centering to avoid conflict with Tailwind
            gsap.set(imageRef.current, { xPercent: -50, yPercent: -50 });

            // Setup quickTo for performance
            xTo.current = gsap.quickTo(imageRef.current, "x", { duration: 0.8, ease: "power3.out" });
            yTo.current = gsap.quickTo(imageRef.current, "y", { duration: 0.8, ease: "power3.out" });
        },
        { scope: container, dependencies: [currentImage] }
    );

    // Move image with cursor using quickTo
    const moveImage = contextSafe((e: React.MouseEvent) => {
        if (!imageRef.current) return;

        // Use quickTo if available
        if (xTo.current && yTo.current) {
            xTo.current(e.clientX);
            yTo.current(e.clientY - 100);
        }
    });

    const handleMouseEnter = contextSafe((category: string, e: React.MouseEvent) => {
        activeCategory.current = category;
        setCurrentImage(categoryImages[category] || "/img-proyectos/eternoretorno-editorial.png");

        if (imageRef.current) {
            // Instant position set to prevent "flying in"
            if (xTo.current && yTo.current) {
                xTo.current(e.clientX);
                // Use gsap.set to be 100% sure the starting point is correct for the very first frame
                gsap.set(imageRef.current, { x: e.clientX, y: e.clientY - 100 });
            }

            // "Dry" & Distorted Entry Animation
            gsap.fromTo(imageRef.current,
                {
                    scaleX: 1.5,
                    scaleY: 0.1,
                    skewX: -20,
                    opacity: 0,
                    filter: "grayscale(100%) contrast(200%)" // Slight glitchy look
                },
                {
                    scaleX: 1,
                    scaleY: 1,
                    skewX: 0,
                    opacity: 1,
                    filter: "grayscale(0%) contrast(100%)",
                    duration: 0.3,
                    ease: "expo.out", // Dry/Snappy
                    overwrite: true,
                }
            );
        }
    });

    const handleMouseLeave = contextSafe(() => {
        activeCategory.current = null;
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                scaleX: 1.5,
                scaleY: 0.1,
                opacity: 0,
                duration: 0.2,
                ease: "power4.in", // Snappy exit
                overwrite: true,
            });
        }
    });

    return (
        <>
            {/* Floating Image Container */}
            <div
                ref={imageRef}
                className="fixed top-0 left-0 pointer-events-none z-[100] overflow-hidden w-[200px] h-[150px] opacity-0 scale-0"
            >
                <Image
                    src={currentImage}
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
                <GlitchText
                    text="Editorial"
                    onMouseEnter={(e) => handleMouseEnter("Editorial", e)}
                    onMouseLeave={handleMouseLeave}
                    className="relative z-50 text-center md:text-left cursor-pointer hover:font-bold transition-all text-[var(--beatriz-blue)] underline decoration-solid"
                />
                <GlitchText
                    text="Motion graphics"
                    onMouseEnter={(e) => handleMouseEnter("Motion Graphics", e)}
                    onMouseLeave={handleMouseLeave}
                    className="relative z-50 text-center cursor-pointer hover:font-bold transition-all text-[var(--beatriz-blue)] underline decoration-solid"
                />
                <GlitchText
                    text="Ilustrations"
                    onMouseEnter={(e) => handleMouseEnter("Illustrations", e)}
                    onMouseLeave={handleMouseLeave}
                    className="relative z-50 text-center cursor-pointer hover:font-bold transition-all text-[var(--beatriz-blue)] underline decoration-solid"
                />
                <GlitchText
                    text="Visual identity"
                    onMouseEnter={(e) => handleMouseEnter("Visual Identity", e)}
                    onMouseLeave={handleMouseLeave}
                    className="relative z-50 text-center md:text-right cursor-pointer hover:font-bold transition-all text-[var(--beatriz-blue)] underline decoration-solid"
                />
            </footer>
        </>
    );
}
