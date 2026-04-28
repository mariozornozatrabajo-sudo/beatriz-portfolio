"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavTheme } from "@/context/NavContext";
import { GlitchButton } from "@/components/GlitchButton";

gsap.registerPlugin(ScrollTrigger);

export function PreFooter({ hideWorksCta = false, hideAboutCta = false }: { hideWorksCta?: boolean, hideAboutCta?: boolean } = {}) {
    const container = useRef<HTMLDivElement>(null);
    const { setTheme } = useNavTheme();

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: container.current,
                start: "top 100px", // Adjust as needed
                end: "bottom 100px",
                onEnter: () => setTheme("inverted"),
                onLeave: () => setTheme("default"),
                onEnterBack: () => setTheme("inverted"),
                onLeaveBack: () => setTheme("default"),
            });
        }, container);

        return () => ctx.revert();
    }, [setTheme]);

    return (
        <section
            ref={container}
            className="w-full min-h-screen bg-[#041abe] text-[#dde904] flex flex-col justify-center px-6 md:px-12 py-20 relative overflow-hidden"
        >
            {/* Grid Container */}
            <div className="w-full max-w-[1416px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-[21px] items-end">

                {/* Column 1: CTAs (Spans 5 cols typically or based on Figma width 698px/1416px ~ 6 cols) */}
                <div className="col-span-1 md:col-span-6 flex flex-col gap-[96px] items-start">
                    {/* Block 1 */}
                    {!hideWorksCta && (
                        <div className="flex flex-col gap-8 items-start w-full">
                            <h2 className="font-['Fractul_Variable'] font-semibold text-5xl md:text-[96px] leading-[0.9] text-[#dde904] capitalize mix-blend-exclusion">
                                Si quieres ver más
                            </h2>
                            <GlitchButton href="/works" text="Ver todos los proyectos" className="text-lg md:text-[24px] px-2 py-1" />
                        </div>
                    )}

                    {/* Block 2 */}
                    {!hideAboutCta && (
                        <div className="flex flex-col gap-8 items-start w-full">
                            <h2 className="font-['Fractul_Variable'] font-semibold text-5xl md:text-[96px] leading-[0.9] text-[#dde904] capitalize mix-blend-exclusion">
                                Si quieres saber más
                            </h2>
                            <GlitchButton href="/about" text="Ver más sobre mí" className="text-lg md:text-[24px] px-2 py-1" />
                        </div>
                    )}
                </div>

                {/* Column 2: Image & Third CTA (Spans 6 cols) */}
                {/* Figma Node 361:182 width 697px -> approx 6 cols */}
                <div className="col-span-1 md:col-span-6 relative h-[593px] w-full">
                    {/* Image Container */}
                    <div className="absolute top-0 right-0 w-[593px] h-[575px] flex items-center justify-center">
                        <div className="relative w-full h-full rotate-180 -scale-y-100">
                            <div className="absolute inset-0 mix-blend-difference overflow-hidden pointer-events-none">
                                {/* Use actual image URL from Figma */}
                                <img
                                    src="http://localhost:3845/assets/3a4b3baeeb7ebb8d2e1027ea12271a52e876fa20.png"
                                    alt="Illustration"
                                    className="absolute h-[103.22%] left-0 max-w-none top-0 w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Third CTA Positioning */}
                    <div className="absolute bottom-0 left-0 flex flex-col gap-[33px] items-start w-full pointer-events-none md:pointer-events-auto">
                        <h2 className="font-['Fractul_Variable'] font-semibold text-5xl md:text-[96px] leading-[0.9] text-[#dde904] capitalize mix-blend-exclusion">
                            Si quieres hablar conmigo
                        </h2>
                        <GlitchButton href="/contact" text="Descubramos como puedo ayudarte" className="text-lg md:text-[24px] px-2 py-1" />
                    </div>
                </div>
            </div>
        </section>
    );
}
