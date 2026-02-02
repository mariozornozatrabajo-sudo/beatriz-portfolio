"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Dummy Data
const projects = [
    {
        id: 1,
        title: "Eclipse Sensory",
        category: "Immersive Experience",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        aspect: "aspect-[3/4]",
    },
    {
        id: 2,
        title: "Nebula Branding",
        category: "Visual Identity",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop",
        aspect: "aspect-square",
    },
    {
        id: 3,
        title: "Vortex Spatial",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
        aspect: "aspect-[4/3]",
    },
    {
        id: 4,
        title: "Quantum Leap",
        category: "Editorial",
        image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2400&auto=format&fit=crop",
        aspect: "aspect-[3/5]",
    },
];

export function Works() {
    const container = useRef<HTMLElement>(null);
    const rightColTrigger = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Entry Animation
            const cards = gsap.utils.toArray<HTMLElement>(".project-card");

            cards.forEach((card) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        },
                    }
                );
            });

            // Parallax Effect for Right Column
            // We'll target the right column items specifically for a faster scroll speed
            const rightCards = cards.filter((_, i) => i % 2 !== 0);

            if (window.innerWidth >= 768) { // Only do parallax on desktop
                rightCards.forEach((card) => {
                    gsap.to(card, {
                        y: -50, // Move up slightly faster than scroll
                        ease: "none",
                        scrollTrigger: {
                            trigger: container.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        }
                    });
                });
            }

            // Background Entry Animation
            gsap.fromTo(".works-bg",
                { opacity: 0, filter: "blur(10px)", scale: 1.1 },
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 60%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        },
        { scope: container }
    );

    return (
        <section
            id="works"
            ref={container}
            className="relative w-full min-h-screen bg-[var(--background)] text-[var(--beatriz-blue)]"
        >
            {/* Sticky Background */}
            <div className="works-bg sticky top-0 left-0 w-full h-screen -z-0 overflow-hidden">
                <Image
                    src="/works-bg.png"
                    alt="Works Background"
                    fill
                    className="object-cover opacity-100" // Adjust opacity if needed, user didn't specify
                    quality={100}
                />
            </div>

            <div ref={rightColTrigger} className="relative z-10 max-w-[1400px] mx-auto py-32 md:py-48 px-6 md:px-10 -mt-[100vh]">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-24 gap-y-24 md:gap-y-0">
                    {projects.map((project, index) => {
                        const isRightColumn = index % 2 !== 0;

                        return (
                            <div
                                key={project.id}
                                className={`project-card flex flex-col group ${isRightColumn ? "md:mt-32" : ""
                                    }`}
                            >
                                {/* Image Container */}
                                <div className={`relative w-full ${project.aspect} overflow-hidden`}>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    {/* Overlay for hover interaction hint if needed, currently just pointer */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-black mix-blend-overlay" />
                                </div>

                                {/* Text Content */}
                                <div className="mt-6 flex flex-col items-start">
                                    <h3 className="font-heading text-[20px] leading-none mb-2">
                                        {project.title}
                                    </h3>
                                    <span className="font-mono text-[14px] tracking-wide text-gray-600">
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
