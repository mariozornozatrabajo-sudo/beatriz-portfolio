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
            // Entry Animation
            gsap.from(".project-anim", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
            });
        },
        { scope: container }
    );

    if (!project) return null;

    // Placeholder images setup
    // In a real scenario, we would have specific images for each scroll section.
    // Using the placeholder and project images for now.
    const img1 = project.image || "/projectimgs/placeholder.png";
    const img2 = project.gallery?.[0] || "/projectimgs/placeholder.png";
    const img3 = project.gallery?.[1] || "/projectimgs/placeholder.png";

    return (
        <main
            ref={container}
            className="relative min-h-[300vh] w-full font-mono selection:bg-[var(--beatriz-yellow)] selection:text-black"
        >


            {/* Scrollable Background Images Layer */}
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

            {/* Content Overlay: Sticky Columns */}
            <div className="relative w-full max-w-[1512px] mx-auto min-h-[300vh] pointer-events-none">
                {/* STRICT STICKY SETUP: items-start prevents stretching, enabling sticky to work on content height */}
                {/* FORCED HEIGHT: h-[300vh] ensures the grid track is exactly as tall as the background, enabling sticky for the full duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 h-[300vh] items-start">

                    {/* Left Column - Sticky */}
                    {/* ADJUST HERE: 'top-[120px]' sets the sticky offset. Change this value to adjust distance from top. */}
                    <div className="relative flex flex-col h-full pointer-events-none">

                        {/* Layer 1: Text (Blend Mode: Exclusion) */}
                        <div className="sticky top-[120px] p-6 md:p-10 h-fit mix-blend-exclusion z-10 transition-all duration-300">
                            <div className="flex flex-col gap-2 pointer-events-auto">
                                <StyledText as="p" className="project-anim font-mono text-[20px]" blendMode="mix-blend-normal">
                                    {project.category}
                                </StyledText>
                                <StyledText as="h1" className="project-anim font-heading font-semibold text-[60px] md:text-[64px] leading-[1.1] capitalize" blendMode="mix-blend-normal">
                                    {project.title}
                                </StyledText>
                            </div>
                        </div>

                        {/* Layer 2: Button (Blend Mode: Normal - No blend class on container) */}
                        {/* Positioned to sit at the bottom of the viewport roughly */}
                        <div className="sticky top-[85vh] p-6 md:p-10 h-fit z-20">
                            <div className="project-anim pointer-events-auto">
                                <GlitchButton text="Hablemos!" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sticky */}
                    {/* ADJUST HERE: 'top-[120px]' should match the left column or be adjusted independently. */}
                    {/* FIXED: Added mix-blend-exclusion to the sticky container */}
                    <div className="sticky top-[120px] flex flex-col justify-center p-6 md:p-10 pointer-events-auto h-fit mix-blend-exclusion">
                        <div className="bg-transparent p-8 md:p-12 flex flex-col gap-8 max-w-xl">

                            {/* Roles */}
                            <div className="flex flex-col">
                                <StyledText as="p" className="project-anim font-mono text-[20px] mb-2 opacity-80" blendMode="mix-blend-normal">
                                    Rol
                                </StyledText>
                                {project.roles ? project.roles.map((role, i) => (
                                    <StyledText key={i} as="span" className="project-anim font-heading font-semibold text-[40px] md:text-[80px] leading-[0.9] capitalize" blendMode="mix-blend-normal">
                                        {role}
                                    </StyledText>
                                )) : (
                                    <StyledText as="span" className="project-anim font-heading font-semibold text-[40px] md:text-[80px] leading-[0.9] capitalize" blendMode="mix-blend-normal">
                                        Designer
                                    </StyledText>
                                )}
                            </div>

                            {/* Description */}
                            <StyledText className="project-anim font-mono text-[16px] leading-relaxed whitespace-pre-line" blendMode="mix-blend-normal">
                                {project.description}
                            </StyledText>

                        </div>
                    </div>

                </div>
            </div>

            {/* Footer Navigation (at the very bottom of the scroll) */}
            <div className="relative z-20 w-full py-32 flex flex-col items-center justify-center gap-8 mix-blend-differece">
                <Link href={`/works/${(projectId || 0) + 1}`} className="scale-125">
                    <GlitchButton text="Siguiente Proyecto" />
                </Link>
                <Link href="/works" className="font-mono text-[var(--beatriz-blue)] hover:text-[var(--beatriz-yellow)] transition-colors underline decoration-solid underline-offset-4 mix-blend-difference">
                    Volver a Proyectos
                </Link>
            </div>

        </main>
    );
}
