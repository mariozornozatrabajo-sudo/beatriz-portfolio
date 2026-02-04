"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";
import { GlitchButton } from "./GlitchButton";

gsap.registerPlugin(ScrollTrigger);

// Dummy Data
const projects = [
    {
        id: 1,
        title: "Eterno Retorno",
        category: "Editorial",
        image: "/img-proyectos/eternoretorno-editorial.png",
        aspect: "aspect-[3/4]",
    },
    {
        id: 2,
        title: "Memories",
        category: "Motion",
        image: "/img-proyectos/memories-motion.png",
        aspect: "aspect-square",
    },
    {
        id: 3,
        title: "Nudo",
        category: "Editorial",
        image: "/img-proyectos/nudo-editorial.png",
        aspect: "aspect-[4/3]",
    },
    {
        id: 4,
        title: "Teatro Canal",
        category: "Identidad",
        image: "/img-proyectos/teatrocanal-identidad.jpg",
        aspect: "aspect-[3/5]",
    },
];

export function Works() {
    const container = useRef<HTMLElement>(null);
    const rightColTrigger = useRef<HTMLDivElement>(null);
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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
            const rightCards = cards.filter((_, i) => i % 2 !== 0);

            if (window.innerWidth >= 768) {
                rightCards.forEach((card) => {
                    gsap.to(card, {
                        y: -50,
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
                    className="object-cover opacity-100"
                    quality={100}
                />
            </div>

            <div ref={rightColTrigger} className="relative z-10 max-w-[1400px] mx-auto py-32 md:py-48 px-6 md:px-10 -mt-[100vh]">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-24 gap-y-24 md:gap-y-0">
                    {projects.map((project, index) => {
                        const isRightColumn = index % 2 !== 0;
                        const isHovered = hoveredProject === project.id;
                        const isBlurred = hoveredProject !== null && !isHovered;

                        return (
                            <div
                                key={project.id}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                                className={`project-card flex flex-col group transition-all duration-500 will-change-transform ${isRightColumn ? "md:mt-32" : ""} ${isBlurred ? "blur-sm grayscale opacity-60 scale-95" : "opacity-100 scale-100"
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
                                    {/* Overlay for hover interaction hint */}
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


                {/* View All Projects CTA */}
                <div className="mt-32 w-full flex justify-center project-card opacity-0">
                    <GlitchButton text="Ver todos los proyectos" />
                </div>
            </div>
        </section>
    );
}
