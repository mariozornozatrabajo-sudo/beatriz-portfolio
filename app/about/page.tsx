"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { useLenis } from "lenis/react";
import { Footer } from "@/components/Footer";
import { GlitchText } from "@/components/GlitchText";

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
        <main
            ref={container}
            className="relative w-full text-[var(--beatriz-blue)] font-mono selection:bg-[var(--beatriz-yellow)] selection:text-[var(--beatriz-blue)]"
        >
            {/* Fixed Background Video */}
            <div className="fixed inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-50 mix-blend-multiply filter grayscale contrast-125"
                >
                    <source src="/bg-about.mp4" type="video/mp4" />
                </video>
            </div>

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
                                    text="Soy una diseñadora gráfica apasionada por la intersección entre el arte y la tecnología. Mi enfoque se centra en crear experiencias visuales que no solo comuniquen un mensaje, sino que también provoquen una emoción."
                                    triggerOnInView
                                    duration={500}
                                />
                            </p>
                        </div>

                        <div className="min-h-[50vh] flex flex-col justify-center space-y-8">
                            <p className="text-lg md:text-2xl leading-relaxed">
                                <GlitchText
                                    text="Con experiencia en branding, diseño web y dirección de arte, busco siempre empujar los límites de lo convencional. Me inspira lo extraño, lo único y lo que rompe las reglas establecidas."
                                    triggerOnInView
                                    duration={500}
                                />
                            </p>
                            <p className="text-lg md:text-2xl leading-relaxed">
                                <GlitchText
                                    text="Creo firmemente que el diseño tiene el poder de transformar la percepción y moldear realidades. Cada proyecto es una oportunidad para explorar nuevas narrativas visuales y conectar con la audiencia en un nivel más profundo."
                                    triggerOnInView
                                    duration={500}
                                />
                            </p>
                        </div>

                        <div className="min-h-[50vh] flex flex-col justify-center space-y-8">
                            <p className="text-lg md:text-2xl leading-relaxed">
                                <GlitchText
                                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                    triggerOnInView
                                    duration={500}
                                />
                            </p>
                            <p className="text-lg md:text-2xl leading-relaxed">
                                <GlitchText
                                    text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                    triggerOnInView
                                    duration={500}
                                />
                            </p>
                            <p className="text-lg md:text-2xl leading-relaxed">
                                <GlitchText
                                    text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
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

            <Footer />
        </main>
    );
}
