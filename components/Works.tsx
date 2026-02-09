"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { GlitchButton } from "./GlitchButton";

gsap.registerPlugin(ScrollTrigger);

import { projects, Category } from "@/data/projects";

interface WorksProps {
    showTitle?: boolean;
    showFilters?: boolean;
    showViewAllButton?: boolean;
}

export function Works({ showTitle = false, showFilters = false, showViewAllButton = true }: WorksProps) {
    const container = useRef<HTMLElement>(null);
    const rightColTrigger = useRef<HTMLDivElement>(null);
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const [filter, setFilter] = useState<Category | 'all'>('all');

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

    const categories: (Category | 'all')[] = ['all', 'editorial', 'motion', 'illustrations', 'identidad', 'visual identity'];
    // Filter out categories that don't have projects if needed, or just keep static list
    const activeCategories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

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
            // Only apply if we have enough items to form columns
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

            // Re-refresh ScrollTrigger after layout changes
            ScrollTrigger.refresh();
        },
        { scope: container, dependencies: [filter, filteredProjects] }
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

                {/* Optional Title and Filters */}
                {(showTitle || showFilters) && (
                    <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        {showTitle && (
                            <h2 className="font-heading text-5xl md:text-7xl leading-none">Proyectos</h2>
                        )}

                        {showFilters && (
                            <div className="flex flex-wrap gap-4 md:gap-8">
                                {activeCategories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilter(cat as Category | 'all')}
                                        className={`font-mono text-sm uppercase tracking-wide transition-colors ${filter === cat
                                            ? "text-[var(--beatriz-blue)] font-bold decoration-2 underline underline-offset-4"
                                            : "text-gray-500 hover:text-[var(--beatriz-blue)]"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-24 gap-y-24 md:gap-y-0">
                    {filteredProjects.map((project, index) => {
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
                {showViewAllButton && (
                    <div className="mt-32 w-full flex justify-center project-card opacity-0">
                        <Link href="/works">
                            <GlitchButton text="Ver todos los proyectos" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
