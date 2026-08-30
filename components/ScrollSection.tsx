"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const ScrollSection = () => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const columns = gsap.utils.toArray<HTMLElement>(".scroll-col");
            let mm = gsap.matchMedia();

            // Desktop animation
            mm.add("(min-width: 768px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top top",
                        end: "+=300%", 
                        pin: true,
                        scrub: 1,
                    },
                });

                columns.forEach((col) => {
                    gsap.set(col, { opacity: 0 });
                    const words = col.querySelectorAll(".scroll-word");
                    gsap.set(words, { y: 20, opacity: 0 });

                    const step = tl.to(col, { opacity: 1, duration: 1, ease: "power2.out" });
                    step.to(words, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" }, "<+=0.2");

                    tl.to({}, { duration: 0.5 });
                });
            });

            // Mobile animation
            mm.add("(max-width: 767px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top top",
                        end: "+=300%",
                        pin: true,
                        scrub: 1,
                    },
                });

                columns.forEach((col, i) => {
                    gsap.set(col, { opacity: 0 });
                    const words = col.querySelectorAll(".scroll-word");
                    gsap.set(words, { y: 20, opacity: 0 });

                    tl.to(col, { opacity: 1, duration: 0.5, ease: "power2.out" });
                    tl.to(words, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" }, "<+=0.1");

                    // Fade out the column before the next one appears (except for the last column)
                    if (i < columns.length - 1) {
                        tl.to(col, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "+=0.3");
                    }
                });
            });

            return () => mm.revert();
        },
        { scope: container }
    );

    // Data for columns
    const data = [
        { title: "Editorial", items: ["Editorial", "Editorial", "Editorial", "Editorial"] },
        { title: "Motion", items: ["Motion", "Motion", "Motion", "Motion"] },
        { title: "Branding", items: ["Branding", "Branding", "Branding", "Branding"] },
    ];

    return (
        <section ref={container} className="relative w-full h-screen bg-[#D4D4D4] flex items-center justify-center overflow-hidden snap-start">
            <div className="w-full px-6 md:px-10 relative md:flex md:justify-between h-full items-center">
                {data.map((col, i) => (
                    <div
                        key={i}
                        className={`scroll-col absolute inset-0 md:relative md:inset-auto flex flex-col h-full justify-center items-center md:items-start w-full md:w-auto ${
                            i === 0 ? "md:!items-start" : i === data.length - 1 ? "md:!items-end" : "md:!items-center"
                        }`}
                    >
                        {col.items.map((item, j) => (
                            <span
                                key={j}
                                className={`scroll-word whitespace-nowrap font-heading text-[12vw] md:text-[6.5vw] leading-[0.85] tracking-tighter text-[#DDE904] mix-blend-difference text-center md:text-left ${
                                    i === 0 ? "md:!text-left" : i === data.length - 1 ? "md:!text-right" : "md:!text-center"
                                }`}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};
