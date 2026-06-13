"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { useLenis } from "lenis/react";
import { GlitchText } from "@/components/GlitchText";
import { PreFooter } from "@/components/PreFooter";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 348;
const framePath = (index: number) => {
    const paddedIndex = index.toString().padStart(4, "0");
    return `/frames/ROTOSCOPIA VIDEO OG-Recuperado-Recuperado${paddedIndex}.png`;
};

export default function AboutPage() {
    const container = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lenis = useLenis();

    // Preload images for smoother scrubbing
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
        const loadImages = async () => {
            const promises = [];
            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                img.src = framePath(i);
                imagesRef.current[i] = img;
                promises.push(new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve; // Continue even if an image fails to load
                }));
            }
            await Promise.all(promises);
            setImagesLoaded(true);
        };

        loadImages();
    }, []);

    // Customize Lenis scroll behavior for this page
    useEffect(() => {
        if (!lenis) return;

        // Slower scroll for About page
        const originalDuration = lenis.options.duration;
        // eslint-disable-next-line react-hooks/immutability
        lenis.options.duration = 3.0; // Slower than default 1.5

        return () => {
            if (lenis && lenis.options) {
                lenis.options.duration = originalDuration;
            }
        };
    }, [lenis]);

    useGSAP(
        () => {
            // ... existing canvas render code ...
            if (!imagesLoaded || !canvasRef.current) return;

            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (!context) return;

            canvas.width = 1920;
            canvas.height = 1080;

            const render = (index: number) => {
                const img = imagesRef.current[index];
                if (img) {
                    // Calculate contained aspect ratio
                    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
            };

            // Initial render
            render(0);

            const frameObj = { frame: 0 };

            ScrollTrigger.create({
                trigger: ".content-section",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5, // smooth scrubbing
                onUpdate: (self) => {
                    const frame = Math.round(self.progress * (frameCount - 1));
                    render(frame);
                }
            });

            // Fade in right column on first scroll
            gsap.fromTo(".canvas-container",
                { opacity: 0 },
                {
                    opacity: 1,
                    scrollTrigger: {
                        trigger: ".content-section",
                        start: "top top", // Start fading as soon as scroll starts
                        end: "top+=200", // Valid CSS value for end
                        scrub: true,
                    }
                }
            );
        },
        { scope: container, dependencies: [imagesLoaded] }
    );

    const handleScrollToContent = () => {
        // Scroll to the second "screen" of the left column or just down a bit? 
        // Let's scroll to the first paragraph container.
        lenis?.scrollTo("#bio-text", {
            duration: 2.5, // Match slower scroll
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
    };

    return (
        <>
        <main
            ref={container}
            className="relative w-full text-[var(--beatriz-blue)] font-mono selection:bg-[var(--beatriz-yellow)] selection:text-[var(--beatriz-blue)]"
        >

            {/* Main Content Section (Unified) */}
            <section className="content-section relative z-10 w-full flex items-start">
                <div className="w-1/2 flex flex-col">
                    {/* Header "Screen" in Left Column */}
                    <div className="h-screen flex flex-col justify-center items-start p-6 md:p-20">
                        <h2 className="text-[68px] font-semibold text-[var(--beatriz-blue)] mix-blend-difference mb-12 tracking-tighter text-left">
                            Sobre mí
                        </h2>
                        <button
                            onClick={handleScrollToContent}
                            className="hero-btn group bg-[var(--beatriz-blue)] text-white w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-colors cursor-pointer hover:bg-transparent hover:backdrop-invert hover:text-white border-none outline-none ring-0"
                        >
                            <ArrowDown className="hero-arrow w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* Bio Text Content */}
                    <div id="bio-text" className="p-6 md:p-20 space-y-12 pb-32">
                        <div className="min-h-[50vh] flex flex-col justify-center space-y-8">
                            <h3 className="text-3xl md:text-5xl font-bold font-heading leading-tight">
                                <GlitchText text="Hola, soy Beatriz." triggerOnInView duration={1500} />
                            </h3>
                            <p className="text-lg md:text-2xl leading-relaxed">
                                <GlitchText
                                    text="Soy estudiante de tercer año de Diseño Gráfico en la Escuela Superior de Diseño de Madrid. Me interesa la relación entre el arte, la tecnología y la comunicación visual, entendiendo el diseño como una herramienta capaz de construir experiencias, transmitir ideas y generar emoción."
                                    triggerOnInView
                                    duration={500}
                                />
                            </p>
                        </div>

                        <div className="min-h-[50vh] flex flex-col justify-center space-y-8">
                            <p className="text-lg md:text-2xl leading-relaxed">
                                <GlitchText
                                    text="La mayoría de mis trabajos parten del rediseño de proyectos reales, lo que me permite abordar cada propuesta desde una perspectiva cercana al ámbito profesional. Aunque muchos de estos proyectos no lleguen a implementarse, están desarrollados sobre bases fundamentadas, con investigación, análisis previo y una intención clara de responder a necesidades reales de comunicación."
                                    triggerOnInView
                                    duration={500}
                                />
                            </p>
                            <p className="text-lg md:text-2xl leading-relaxed">
                                <GlitchText
                                    text="A lo largo de mi formación he trabajado en proyectos de identidad visual, diseño editorial, diseño web, packaging, dirección de arte y producción audiovisual. Además, también he participado en proyectos reales en colaboración, como los visuales audiovisuales de Sinestesia para la Fashion Week de Madrid, que se llevaron a cabo en riguroso directo."
                                    triggerOnInView
                                    duration={500}
                                />
                            </p>
                        </div>

                        <div className="min-h-[50vh] flex flex-col justify-center space-y-8">
                            <p className="text-lg md:text-2xl leading-relaxed">
                                <GlitchText
                                    text="Me atraen especialmente las propuestas que se alejan de lo convencional, lo extraño, lo experimental y aquello que permite explorar nuevas formas de narrar. Creo que el diseño tiene la capacidad de transformar la manera en la que percibimos una idea, una marca o una historia. Para mí, cada proyecto es una oportunidad para investigar, experimentar y conectar con el público desde una mirada visual propia."
                                    triggerOnInView
                                    duration={500}
                                />
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Image Sequence (Sticky) */}
                {/* It needs to be sticky relative to the main container. 
                    If the main container grows with content, this stays sticky. */}
                <div className="w-1/2 h-screen sticky top-0 right-0 flex items-center justify-center overflow-hidden canvas-container opacity-0">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full object-contain mix-blend-multiply"
                    />
                </div>
            </section>
        </main>
        <PreFooter hideAboutCta={true} />
        </>
    );
}
