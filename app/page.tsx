"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ScrollSection } from "@/components/ScrollSection";
import { GlitchButton } from "@/components/GlitchButton";
import { Footer } from "@/components/Footer";
import { ArrowDown } from "lucide-react";

import { useRef } from "react";
import { useLenis } from "lenis/react";

export default function Home() {
  const container = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lenis = useLenis();


  const handleScrollToWorks = () => {
    lenis?.scrollTo("#works", {
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  };



  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Ensure video plays
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.error("Video play failed", e));
      }

      tl.from(".hero-anim", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      })
        .from(".nav-anim", {
          y: -20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8
        }, "-=0.5")
        .from(".footer-anim", {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8
        }, "-=0.8");
    },
    { scope: container }
  );

  return (
    <>
      <main
        ref={container}
        className="relative min-h-screen w-full bg-[var(--beatriz-gray)] text-[var(--beatriz-blue)] overflow-hidden font-mono snap-start"
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero-video-sinefecto.mp4" type="video/mp4" />
          </video>
        </div>



        {/* Central Content */}
        <div className="flex flex-col justify-center min-h-screen px-6 md:px-10 py-20 relative">
          <div className="space-y-2 md:space-y-4 max-w-full w-fit mt-20">
            {/* Title */}
            <h1 className="hero-anim font-semibold text-6xl md:text-8xl lg:text-[120px] leading-none text-[var(--beatriz-yellow)] mix-blend-exclusion tracking-tighter">
              Beatriz<br />Montes
            </h1>

            {/* Description */}
            <p className="hero-anim font-mono text-lg md:text-[20px] w-[40%] leading-[1.3] mix-blend-exclusion text-white break-words">
              A Creative Partner for companies and brands that decide to move forward.
            </p>
          </div>

          {/* CTA Button */}
          <div className="hero-anim mt-6">
            <GlitchButton text="Hablemos!" />
          </div>
        </div>

        {/* Bottom Bar / Footer */}
        <Footer />

        {/* Floating Action Button */}
        <div className="footer-anim absolute bottom-16 right-6 md:bottom-20 md:right-10 z-30">
          <button
            onClick={handleScrollToWorks}
            className="hero-btn group bg-[var(--beatriz-blue)] text-white w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-colors cursor-pointer hover:bg-transparent hover:backdrop-invert hover:text-white border-none outline-none ring-0"
          >
            <ArrowDown className="hero-arrow w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </main>
      <ScrollSection />
      <FeaturedProjects />
    </>
  );
}
