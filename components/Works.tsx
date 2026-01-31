"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useMemo, useState } from "react";
import { projects, Category } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export function Works() {
    const container = useRef<HTMLElement>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const featuredProjects = useMemo(() => {
        const categories: Category[] = ['editorial', 'motion graphics', 'illustrations', 'visual identity'];
        return categories.map(cat => projects.find(p => p.category === cat && p.featured)).filter(Boolean) as typeof projects;
    }, []);

    useGSAP(
        () => {
            gsap.from(".work-card", {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                },
                y: 50,
                duration: 0.8,
                stagger: 0.2,
            });
        },
        { scope: container }
    );

    return (
        <section
            id="works"
            ref={container}
            className="relative w-full min-h-screen py-20 px-6 md:px-10 font-mono text-[var(--beatriz-blue)] overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/works-bg.png"
                    alt="Works Background"
                    fill
                    className="object-cover"
                    quality={100}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-20 md:gap-y-24">
                    {featuredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className={`work-card flex flex-col gap-4 transition-all duration-500 ease-in-out ${index % 2 === 1 ? "md:translate-y-20" : "" // Stagger effect for items
                                } ${hoveredId !== null && hoveredId !== project.id
                                    ? "blur-[3px] grayscale"
                                    : ""
                                }`}
                        >
                            <div className="relative w-full aspect-[4/3] bg-gray-200 overflow-hidden shadow-lg group cursor-pointer">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Category Label Overlay */}
                                <div className="absolute top-4 left-4 bg-white/90 px-2 py-1 text-xs font-bold uppercase tracking-wider text-[var(--beatriz-blue)]">
                                    {project.category}
                                </div>
                            </div>
                            <h3 className="text-right text-lg md:text-xl font-bold tracking-tight">
                                {project.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
