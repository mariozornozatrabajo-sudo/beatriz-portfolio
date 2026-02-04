"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// Project Data
const projects = [
    {
        id: 1,
        title: "Eterno Retorno",
        category: "Editorial Design",
        image: "/img-proyectos/eternoretorno-editorial.png",
        aspect: "aspect-[3/4]",
        link: "/projects/eterno-retorno"
    },
    {
        id: 2,
        title: "Memories In Motion",
        category: "Motion Graphics",
        image: "/img-proyectos/memories-motion.png",
        aspect: "aspect-square",
        link: "/projects/memories"
    },
    {
        id: 3,
        title: "Nudo",
        category: "Editorial Experience",
        image: "/img-proyectos/nudo-editorial.png",
        aspect: "aspect-[4/5]",
        link: "/projects/nudo"
    }
];

export function FeaturedProjects() {
    const container = useRef<HTMLElement>(null);
    const cursorBubble = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Setup parallax effect for right column elements
            // We want the right column to move differently effectively creating the staggered feel
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                // Select every second project (right column in a 2-col grid)
                const rightColProjects = gsap.utils.toArray<HTMLElement>(".project-item:nth-child(even)");

                rightColProjects.forEach((proj) => {
                    gsap.to(proj, {
                        y: -120, // Move up as we scroll down
                        ease: "none",
                        scrollTrigger: {
                            trigger: container.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1 // Smooth scrubbing
                        }
                    });
                });
            });

            // Reveal Animation for each project
            const items = gsap.utils.toArray<HTMLElement>(".project-item");
            items.forEach((item) => {
                const img = item.querySelector("img");
                const text = item.querySelector(".project-info");

                // Image reveal
                gsap.fromTo(img,
                    { scale: 1.2, filter: "grayscale(100%)" },
                    {
                        scale: 1,
                        filter: "grayscale(0%)",
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                        }
                    }
                );

                // Text Reveal
                gsap.fromTo(text,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 90%",
                        }
                    }
                );
            });

            // Cursor Follower (Simple Custom Cursor)
            // Note: Currently basic GSAP mouse move, ideally this would hook into a global custom cursor system
            // if one exists, but keeping it localized for this component as requested to work standalone.

        },
        { scope: container }
    );

    // Quick custom cursor handler for project hover
    const onMouseEnter = (e: React.MouseEvent) => {
        // Option: expand custom cursor
        gsap.to(cursorBubble.current, { scale: 1, opacity: 1, duration: 0.3 });
    };

    const onMouseLeave = (e: React.MouseEvent) => {
        gsap.to(cursorBubble.current, { scale: 0, opacity: 0, duration: 0.3 });
    };

    const onMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        // Simple follow
        // In a real refined app, we'd use a global context or fixed portal
        // Here we just let the bubble follow within the container or use fixed positioning if valid
    };

    return (
        <section
            id="featured"
            ref={container}
            className="relative w-full min-h-screen bg-[var(--background)] py-24 md:py-40 px-6 md:px-12 overflow-hidden"
        >
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-24 md:mb-32">
                    <h2 className="font-heading text-6xl md:text-8xl lg:text-9xl text-[var(--beatriz-blue)] uppercase leading-[0.85]">
                        <span className="block overflow-hidden">
                            <span className="block animate-reveal">Featured</span>
                        </span>
                        <span className="block overflow-hidden ml-12 md:ml-32">
                            <span className="block animate-reveal delay-100">Projects</span>
                        </span>
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 md:gap-y-0 gap-x-12 lg:gap-x-32 relative">
                    {/* 
                      Logic for 2 column layout:
                      Even indices will be visually right column (in LTR grid flow) if we use standard grid flow.
                      However, to get the specific "staggered vertical offset" look from design references,
                      we often manually displace the second column.
                      
                      Here, we use standard grid, but the right column items will be translated via GSAP 
                      as scrolling happens. Also we give them an initial top margin.
                     */}

                    {projects.map((project, idx) => {
                        const isRight = idx % 2 !== 0;
                        return (
                            <div
                                key={project.id}
                                className={`project-item group relative flex flex-col ${isRight ? 'md:mt-48' : ''}`}
                            >
                                <Link href={project.link || "#"} className="block w-full cursor-none" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                                    <div className={`relative w-full ${project.aspect} overflow-hidden bg-gray-200 mb-6`}>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-[var(--beatriz-blue)] opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-multiply" />
                                    </div>

                                    <div className="project-info flex justify-between items-baseline border-b border-[var(--beatriz-blue)] pb-4">
                                        <h3 className="font-heading text-3xl md:text-4xl text-[var(--beatriz-blue)] uppercase group-hover:indent-4 transition-all duration-300">
                                            {project.title}
                                        </h3>
                                        <span className="font-mono text-xs md:text-sm text-[var(--beatriz-blue)] uppercase tracking-widest">
                                            {project.category}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>

                {/* View All Button */}
                <div className="flex justify-center mt-32 md:mt-48">
                    <Link
                        href="/works"
                        className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-mono font-medium text-[var(--beatriz-blue)] border border-[var(--beatriz-blue)] rounded-full hover:text-white transition-colors duration-300"
                    >
                        <span className="absolute w-full h-full bg-[var(--beatriz-blue)] absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
                        <span className="relative z-10 flex items-center gap-4">
                            View All Projects
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300">
                                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>

            {/* Custom Mouse Follower Portal (Could be local absolute for now) */}
            <div
                ref={cursorBubble}
                className="pointer-events-none fixed top-0 left-0 w-24 h-24 bg-[var(--beatriz-green)] rounded-full z-50 mix-blend-difference flex items-center justify-center text-[var(--beatriz-blue)] text-xs font-mono uppercase opacity-0 scale-0 -translate-x-1/2 -translate-y-1/2 hidden md:flex"
                style={{ top: 0, left: 0 }} // Controlled via global mouse ideally, but for now we'll rely on global cursor if exists or just standard hover
            >
                View
            </div>
        </section>
    );
}
