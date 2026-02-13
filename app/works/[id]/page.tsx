"use client";

import { projects } from "@/data/projects";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { GlitchButton } from "@/components/GlitchButton";
import { GlitchText } from "@/components/GlitchText";

gsap.registerPlugin(ScrollTrigger);

import { ProjectBackground } from "@/components/ProjectBackground";
import { StyledText } from "@/components/StyledText";

export default function ProjectPage() {
    const params = useParams();
    const router = useRouter();
    const container = useRef<HTMLElement>(null);

    // Find project
    const projectId = params.id ? parseInt(params.id as string) : null;
    const project = projects.find((p) => p.id === projectId);

    // Redirect if not found
    useEffect(() => {
        if (!project && projectId !== null) {
            router.push("/works");
        }
    }, [project, projectId, router]);

    useGSAP(
        () => {


            // Exit Animation (Optional internal exit for text)
            gsap.to(".exit-target", {
                y: -50,
                opacity: 0,
                filter: "blur(5px)",
                scrollTrigger: {
                    trigger: ".grid-exit-trigger",
                    start: "85% bottom",
                    end: "bottom bottom",
                    scrub: 1,
                },
                stagger: 0.05,
                ease: "power1.in",
            });

            // "Pinned Card" Effect:
            // Target the WRAPPER of both background and content.
            // This ensures they stay in the same stacking context (preserving blend modes)
            // and animate together.
            gsap.to(".project-main-wrapper", {
                scale: 0.9,
                filter: "blur(10px)",
                opacity: 0.4,
                scrollTrigger: {
                    trigger: ".technical-sheet-trigger",
                    start: "top bottom", // When Tech Sheet enters viewport
                    end: "top top",      // When Tech Sheet covers viewport
                    scrub: true,
                },
                transformOrigin: "center bottom", // Scale from bottom to look like it's staying put
                ease: "none",
            });
        },
        { scope: container }
    );

    if (!project) return null;

    // Placeholder images setup
    const img1 = project.image || "/projectimgs/placeholder.png";
    const img2 = project.gallery?.[0] || "/projectimgs/placeholder.png";
    const img3 = project.gallery?.[1] || "/projectimgs/placeholder.png";

    return (
        <main
            ref={container}
            className="relative min-h-[300vh] w-full font-mono selection:bg-[var(--beatriz-yellow)] selection:text-black bg-[var(--background)]"
        >

            {/* Main Project Wrapper: Contains Background + Sticky Content */}
            {/* Animating this wrapper preserves the mix-blend-mode relationship inside */}
            {/* Added bg-[var(--background)] to provide a solid backdrop for blend modes */}
            <div className="project-main-wrapper relative w-full min-h-[300vh] origin-bottom bg-[var(--background)]">

                {/* Scrollable Background Images Layer */}
                {/* Reverted to absolute so it scrolls with the container */}
                <div className="project-background-layer absolute inset-0 w-full h-full">
                    {projectId === 5 ? (
                        <ProjectBackground
                            img1="/projectimgs/otras-mentes/coleccion-pulpos.png"
                            img2="/projectimgs/otras-mentes/mockup-landscape.png"
                            img3="/projectimgs/otras-mentes/mockup-portrait.png"
                        />
                    ) : (
                        <ProjectBackground
                            img1={img1}
                            img2={img2}
                            img3={img3}
                        />
                    )}
                </div>

                {/* Content Overlay: Sticky Columns */}
                {/* REMOVED z-10 to prevent stacking context isolation, allowing blend mode to work with background */}
                <div className="content-overlay-layer relative w-full max-w-[1512px] mx-auto min-h-[300vh] pointer-events-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 h-[300vh] grid-exit-trigger">

                        {/* Left Column - Sticky */}
                        <div className="relative flex flex-col justify-between h-full pointer-events-none">

                            {/* Top Content: Title & Category */}
                            <div className="sticky top-[80px] md:top-[120px] p-6 md:p-10 mb-32 mix-blend-exclusion transition-all duration-300 pointer-events-auto">
                                <div className="flex flex-col gap-2 exit-target">
                                    <StyledText as="p" className="project-anim font-mono text-[14px] md:text-[20px]" blendMode="mix-blend-normal">
                                        <GlitchText text={project.category || ""} triggerOnLoad={true} disableHover={true} />
                                    </StyledText>
                                    <StyledText as="h1" className="project-anim font-heading font-semibold text-[40px] sm:text-[50px] md:text-[64px] leading-[1.1] capitalize" blendMode="mix-blend-normal">
                                        <GlitchText text={project.title || ""} triggerOnLoad={true} delay={200} disableHover={true} />
                                    </StyledText>
                                </div>
                            </div>

                            {/* Bottom Content: Button */}
                            <div className="sticky bottom-12 p-6 md:p-10 h-fit z-40 flex flex-col justify-end">
                                <div className="project-anim pointer-events-auto exit-target">
                                    <GlitchButton text="Hablemos!" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sticky */}
                        <div className="sticky top-[120px] flex flex-col justify-center p-6 md:p-10 pointer-events-auto h-fit mix-blend-exclusion">
                            <div className="bg-transparent p-8 md:p-12 flex flex-col gap-8 max-w-xl">

                                {/* Roles */}
                                <div className="flex flex-col exit-target">
                                    <StyledText as="p" className="project-anim font-mono text-[20px] mb-2 opacity-80" blendMode="mix-blend-normal">
                                        Rol
                                    </StyledText>
                                    {project.roles ? project.roles.map((role, i) => (
                                        <StyledText key={i} as="span" className="project-anim font-heading font-semibold text-[40px] md:text-[80px] leading-[0.9] capitalize" blendMode="mix-blend-normal">
                                            <GlitchText text={role} triggerOnLoad={true} delay={400 + (i * 100)} disableHover={true} />
                                        </StyledText>
                                    )) : (
                                        <StyledText as="span" className="project-anim font-heading font-semibold text-[40px] md:text-[80px] leading-[0.9] capitalize" blendMode="mix-blend-normal">
                                            <GlitchText text="Designer" triggerOnLoad={true} delay={400} disableHover={true} />
                                        </StyledText>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="exit-target">
                                    <StyledText className="project-anim font-mono text-[16px] leading-relaxed whitespace-pre-line" blendMode="mix-blend-normal">
                                        <GlitchText text={project.description || ""} triggerOnLoad={true} duration={1000} delay={600} disableHover={true} />
                                    </StyledText>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Technical Sheet Section - Pinned Card Next Item */}
            {/* Added Z-index 20 to sit ON TOP of Main Content */}
            <section className="technical-sheet-trigger w-full min-h-screen bg-[var(--beatriz-blue)] relative z-20 py-24 md:py-32 px-6 md:px-10 flex flex-col justify-center text-[var(--beatriz-yellow)]">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

                    {/* Title */}
                    <div>
                        <StyledText as="h3" className="font-heading text-[32px] md:text-[48px] leading-tight mb-8" blendMode="mix-blend-normal">
                            Ficha Técnica
                        </StyledText>
                    </div>

                    {/* Details Grid */}
                    <div className="flex flex-col gap-6">
                        {project.technicalDetails ? (
                            project.technicalDetails.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-4 border-b border-[var(--beatriz-yellow)]/20 pb-4">
                                    <div className="col-span-4">
                                        <StyledText as="span" className="font-mono text-[14px] opacity-60 uppercase tracking-wider" blendMode="mix-blend-normal">
                                            {item.label}
                                        </StyledText>
                                    </div>
                                    <div className="col-span-8">
                                        <StyledText as="span" className="font-mono text-[16px]" blendMode="mix-blend-normal">
                                            {item.value}
                                        </StyledText>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="grid grid-cols-12 gap-4 border-b border-[var(--beatriz-yellow)]/20 pb-4">
                                <div className="col-span-4">
                                    <StyledText as="span" className="font-mono text-[14px] opacity-60 uppercase tracking-wider" blendMode="mix-blend-normal">
                                        Info
                                    </StyledText>
                                </div>
                                <div className="col-span-8">
                                    <StyledText as="span" className="font-mono text-[16px]" blendMode="mix-blend-normal">
                                        Detalles no disponibles
                                    </StyledText>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Navigation (Inside Tech Sheet or just below) */}
                <div className="w-full flex justify-center mt-32 relative z-20">
                    <div className="flex flex-col items-center justify-center gap-8">
                        <Link href={`/works/${(projectId || 0) + 1}`} className="scale-125">
                            <GlitchButton text="Siguiente Proyecto" />
                        </Link>
                        <Link href="/works" className="font-mono text-[var(--beatriz-yellow)] hover:text-white transition-colors underline decoration-solid underline-offset-4">
                            <GlitchText text="[ Volver a Proyectos ]" />
                        </Link>
                    </div>
                </div>
            </section>

        </main >
    );
}
