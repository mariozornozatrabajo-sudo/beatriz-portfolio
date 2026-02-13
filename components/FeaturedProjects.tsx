import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { GlitchButton } from "./GlitchButton";
import { GlitchText } from "./GlitchText";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedProjects() {
    const container = useRef<HTMLElement>(null);
    const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);
    const [galleryIndex, setGalleryIndex] = useState(0);

    // Gallery Slideshow Interval
    useEffect(() => {
        if (hoveredProjectId === null) return;

        const interval = setInterval(() => {
            setGalleryIndex(prev => prev + 1);
        }, 500); // 0.5s delay between images

        return () => clearInterval(interval);
    }, [hoveredProjectId]);

    useGSAP(
        () => {
            const items = gsap.utils.toArray(".featured-item") as HTMLElement[];

            items.forEach((item, index) => {
                const nextItem = items[index + 1];
                if (!nextItem) return;

                gsap.to(item, {
                    scale: 0.9,
                    opacity: 0.4,
                    filter: "blur(10px)",
                    scrollTrigger: {
                        trigger: nextItem,
                        start: "top bottom", // When the top of the next item hits the bottom of the viewport
                        end: "top top", // When the top of the next item hits the top of the viewport
                        scrub: true,
                    },
                });
            });
        },
        { scope: container }
    );

    // Filter only top 4 projects
    const featuredProjects = projects.filter(p => p.featured).slice(0, 4);

    return (
        <section
            id="works"
            ref={container}
            className="relative w-full bg-[var(--background)]"
        >
            <div>
                {featuredProjects.map((project, index) => {
                    // Use gallery if available, otherwise fallback to repeating main image
                    const galleryImages = project.gallery?.length
                        ? project.gallery
                        : [project.image];

                    const currentImage = galleryImages[galleryIndex % galleryImages.length];

                    return (
                        <div
                            key={project.id}
                            className="featured-item sticky top-0 w-full min-h-screen flex flex-col justify-center overflow-hidden origin-top"
                        >
                            {/* Background Image - Full Screen but treated as "Mockup" background */}
                            <div className="absolute inset-0 z-0 w-full h-full">
                                <div className="featured-img-container relative w-full h-full">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover" // Full opacity for mix-blend to work best
                                        sizes="100vw"
                                        priority={index === 0}
                                    />
                                    {/* Overlay removed for mix-blend-exclusion effect */}
                                </div>
                            </div>

                            {/* Content Container - Matching Nav Alignment (p-6 md:p-10) */}
                            {/* Removing z-10 to prevent isolation from background image which might block mix-blend-mode */}
                            <div className="relative w-full h-full px-6 md:px-10 grid grid-cols-12 gap-5 pointer-events-none">
                                <div className="col-span-12 md:col-span-8 lg:col-span-6 flex flex-col justify-center min-h-screen pointer-events-auto">
                                    {/* Fixed Height Container to match Figma's 613px spacing and positioning */}
                                    <div className="flex flex-col justify-between h-[600px] md:h-[613px]">
                                        <div className="flex flex-col gap-6 items-start">

                                            {/* Category & Title */}
                                            <div className="flex flex-col gap-1 items-start w-full">
                                                {/* Category: 20px Cascadia Code */}
                                                <p className="reveal-text font-mono text-[16px] md:text-[20px] text-[var(--beatriz-yellow)] mix-blend-exclusion">
                                                    {project.category}
                                                </p>

                                                {/* Title: 96px Fractul Variable SemiBold, Leading 90px */}
                                                <h2 className="reveal-text font-heading font-semibold text-[60px] md:text-[96px] leading-[0.9] md:leading-[90px] text-[var(--beatriz-blue)] mix-blend-exclusion capitalize">
                                                    {project.title}
                                                </h2>
                                            </div>

                                            {/* Description: 16px Cascadia Code, max-w-[600px] */}
                                            <p className="reveal-text font-mono text-[14px] md:text-[16px] text-white mix-blend-exclusion max-w-[600px] leading-normal">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Link: Positioned at bottom of 613px container via justify-between */}
                                        <div
                                            className="reveal-text flex justify-start mix-blend-exclusion" /* Apply mix-blend-exclusion to wrapper too */
                                            onMouseEnter={() => setHoveredProjectId(project.id)}
                                            onMouseLeave={() => setHoveredProjectId(null)}
                                        >
                                            <Link
                                                href={`/works/${project.id}`}
                                                className="font-mono text-[20px] md:text-[24px] text-white mix-blend-exclusion underline decoration-solid underline-offset-4 hover:text-[var(--beatriz-yellow)] transition-colors"
                                            >
                                                <GlitchText text="[Leer +]" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Gallery Column - Visible on Hover - Larger Container */}
                                {/* Using conditional rendering or key to trigger glitch animation on entry */}
                                <div className={`col-span-12 lg:col-span-6 hidden lg:flex flex-col justify-center items-end h-full pointer-events-none`}>
                                    {hoveredProjectId === project.id && (
                                        <div className="w-full max-w-[800px] h-[500px] md:h-[600px] relative overflow-hidden rounded-lg animate-glitch-appear">
                                            <Image
                                                key={galleryIndex} // Key triggers animation on image change
                                                src={currentImage}
                                                alt={`${project.title} gallery`}
                                                fill
                                                className="object-cover rounded-lg" // Removed fade-in to let the container glitch-in dominate, or keep for smooth slide
                                            />
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="w-full flex justify-center py-20 bg-[var(--background)]">
                <Link href="/works">
                    <GlitchButton text="Ver todos los proyectos" />
                </Link>
            </div>
        </section>
    );
}
