"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Works } from "@/components/Works";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const container = useRef<HTMLElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

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
        className="relative min-h-screen w-full bg-[var(--beatriz-gray)] text-[var(--beatriz-blue)] overflow-hidden font-mono"
      >
        {/* Background Video */}
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
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Header / Top Bar */}
        <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 text-sm md:text-base font-normal text-[var(--beatriz-blue)] mix-blend-difference md:mix-blend-normal">
          <div className="nav-anim tracking-tight font-mono text-[20px] leading-none">
            <Link href="/">Beatriz Montes Gijón</Link>
          </div>
          <nav className="nav-anim flex gap-12 bg-[var(--beatriz-blue)] text-white">
            {["About", "Works", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-gray-300 transition-colors duration-200 block"
              >
                {item}
              </Link>
            ))}
          </nav>
        </header>

        {/* Central Content */}
        <div className="flex flex-col justify-center min-h-screen px-6 md:px-10 py-20 relative">
          <div className="space-y-2 md:space-y-4 max-w-[90vw]">
            <h1 className="flex flex-col font-normal leading-[0.9] text-white mix-blend-difference tracking-tighter">
              <span className="hero-anim text-5xl md:text-7xl lg:text-8xl">Soy Beatriz</span>
              <span className="hero-anim text-5xl md:text-7xl lg:text-8xl">Graphic Designer</span>
            </h1>
          </div>

          {/* CTA Button */}
          <div className="hero-anim mt-6 ml-2 md:ml-4">
            <button className="bg-[var(--beatriz-green)] text-black px-8 py-4 md:px-12 md:py-5 text-sm md:text-base cursor-pointer hover:bg-[#00e626] transition-colors font-bold uppercase tracking-wide">
              Hablemos!
            </button>
          </div>
        </div>

        {/* Bottom Bar / Footer */}
        <footer className="absolute bottom-0 left-0 w-full bg-[var(--beatriz-gray)] py-4 px-6 md:px-10 grid grid-cols-2 md:flex md:justify-between gap-4 text-xs md:text-sm z-20 border-t border-black/5 text-[var(--beatriz-blue)]">
          <span className="footer-anim text-center md:text-left">Editorial</span>
          <span className="footer-anim text-center">Motion graphics</span>
          <span className="footer-anim text-center">Ilustrations</span>
          <span className="footer-anim text-center md:text-right">Visual identity</span>
        </footer>

        {/* Floating Action Button */}
        <div className="footer-anim absolute bottom-16 right-6 md:bottom-20 md:right-10 z-30">
          <Link href="#works">
            <button className="bg-[var(--beatriz-blue)] text-white w-12 h-12 md:w-16 md:h-16 flex items-center justify-center hover:bg-[#000088] transition-colors">
              <ArrowDown className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </Link>
        </div>
      </main>
      <Works />
    </>
  );
}
