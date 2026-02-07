"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export function Contact() {
    const container = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const { contextSafe } = useGSAP({ scope: container });

    const moveImage = contextSafe((e: React.MouseEvent) => {
        if (!imageRef.current || !activeCategory) return;

        // Offset Y to appear above cursor
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

            <section
                id="contact"
                ref={container}
                onMouseMove={moveImage}
                className="relative w-full bg-[#111] text-white py-20 px-6 md:px-10 min-h-screen flex flex-col justify-between"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 flex-grow">
                    {/* Left Column: Text & Links */}
                    <div className="flex flex-col justify-between space-y-12">
                        <div>
                            <p className="text-xl md:text-2xl font-mono leading-relaxed max-w-md mb-8">
                                Me cago en vuestra puta vida, contratadme :)
                            </p>

                            <div className="flex flex-wrap gap-6 text-[var(--beatriz-yellow)] font-mono text-sm md:text-base">
                                <Link href="#" className="hover:underline">LinkedIn</Link>
                                <Link href="#" className="hover:underline">Instagram</Link>
                                <Link href="#" className="hover:underline">Behance</Link>
                            </div>
                        </div>

                        <div className="space-y-2 text-[var(--beatriz-yellow)] font-mono text-sm md:text-base">
                            <p>+ 34 625 22 66 11</p>
                            <p>tirce1120@gmail.com</p>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="flex justify-center md:justify-end items-center">
                        <div className="relative w-full max-w-xs md:max-w-md aspect-square">
                            <Image
                                src="/footer-figures.png"
                                alt="Figures"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Categories */}
                <div className="grid grid-cols-2 md:flex md:justify-between gap-4 text-xs md:text-sm pt-20 border-t border-white/10 mt-10 text-white font-mono">
                    <span
                        onMouseEnter={() => handleMouseEnter("Editorial")}
                        onMouseLeave={handleMouseLeave}
                        className="relative z-10 text-center md:text-left cursor-pointer hover:font-bold transition-all hover:text-[var(--beatriz-blue)]"
                    >
                        Editorial
                    </span>
                    <span
                        onMouseEnter={() => handleMouseEnter("Motion Graphics")}
                        onMouseLeave={handleMouseLeave}
                        className="relative z-10 text-center cursor-pointer hover:font-bold transition-all hover:text-[var(--beatriz-blue)]"
                    >
                        Motion graphics
                    </span>
                    <span
                        onMouseEnter={() => handleMouseEnter("Illustrations")}
                        onMouseLeave={handleMouseLeave}
                        className="relative z-10 text-center cursor-pointer hover:font-bold transition-all hover:text-[var(--beatriz-blue)]"
                    >
                        Ilustrations
                    </span>
                    <span
                        onMouseEnter={() => handleMouseEnter("Visual Identity")}
                        onMouseLeave={handleMouseLeave}
                        className="relative z-10 text-center md:text-right cursor-pointer hover:font-bold transition-all hover:text-[var(--beatriz-blue)]"
                    >
                        Visual identity
                    </span>
                </div>
            </section>
        </>
    );
}
