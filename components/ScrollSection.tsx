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

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "+=300%", // Pin for 3 screen heights (adjustable)
                    pin: true,
                    scrub: 1,
                },
            });

            columns.forEach((col, i) => {
                // Initially hide all columns except maybe the first one?
                // Or reveal them one by one.
                // User said: "con cada scroll del usuario (con el scroll bloqueado) aparezca una de las columnas y las palabras de esa columna aparezcan con stagger."

                // Let's set initial opacity to 0 for all columns
                gsap.set(col, { opacity: 0 });

                // Identify words inside the column
                const words = col.querySelectorAll(".scroll-word");
                gsap.set(words, { y: 20, opacity: 0 });

                const step = tl.to(col, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                });

                step.to(words, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                }, "<+=0.2"); // Start slightly after column fade in starts

                // Add a small pause or gap before the next column?
                tl.to({}, { duration: 0.5 });
            });
        },
        { scope: container }
    );

    // Data for columns
    const data = [
        { title: "Libros", items: ["Libros", "Libros", "Libros", "Libros"] },
        { title: "Vídeos", items: ["Vídeos", "Vídeos", "Vídeos", "Vídeos"] },
        { title: "Dibujitos", items: ["Doodle", "Doodle", "Doodle", "Doodle"] },
        { title: "Marcas", items: ["Marcas", "Marcas", "Marcas", "Marcas"] },
    ];

    return (
        <section ref={container} className="relative w-full h-screen bg-[#D4D4D4] flex items-center justify-center overflow-hidden snap-start">
            <div className="w-full px-6 md:px-10 grid grid-cols-2 md:flex md:justify-between gap-4 h-full items-center">
                {data.map((col, i) => (
                    <div
                        key={i}
                        className={`scroll-col flex flex-col h-full justify-center ${i === 0 ? "items-start" : i === data.length - 1 ? "items-end" : "items-center"
                            }`}
                    >
                        {col.items.map((item, j) => (
                            <span
                                key={j}
                                className={`scroll-word font-heading text-[10vw] md:text-[6.5vw] leading-[0.85] tracking-tighter text-[#DDE904] mix-blend-difference ${i === 0 ? "text-left" : i === data.length - 1 ? "text-right" : "text-center"
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
