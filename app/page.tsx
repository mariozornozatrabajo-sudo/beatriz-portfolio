"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Works } from "@/components/Works";
import { ScrollSection } from "@/components/ScrollSection";
import { GlitchButton } from "@/components/GlitchButton";
import { Footer } from "@/components/Footer";
import { ArrowDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useLenis } from "lenis/react";

export default function Home() {
  const container = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lenis = useLenis();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollToWorks = () => {
    lenis?.scrollTo("#works", {
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
        <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 text-sm md:text-base font-normal text-[var(--beatriz-blue)]">
          <div className="nav-anim tracking-tight font-mono text-[20px] leading-none z-50 relative mix-blend-difference text-[var(--beatriz-blue)]">
            <Link href="/">Beatriz Montes Gijón</Link>
          </div>

          {/* Desktop Nav */}
          <nav className="nav-anim hidden md:flex gap-12 bg-[var(--beatriz-blue)] text-white mix-blend-difference">
            {["About", "Works", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-[var(--beatriz-green)] block"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden z-50 relative text-[var(--beatriz-blue)] hover:text-[var(--beatriz-green)] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-[var(--beatriz-gray)] z-40 flex flex-col items-center justify-center gap-8 text-3xl">
              {["About", "Works", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-[var(--beatriz-green)] block text-[var(--beatriz-blue)] font-bold"
                >
                  {item}
                </Link>
              ))}
            </div>
          )}
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
            <GlitchButton />
          </div>
        </div>

        {/* Bottom Bar / Footer */}
        <Footer />

        {/* Floating Action Button */}
        <div className="footer-anim absolute bottom-16 right-6 md:bottom-20 md:right-10 z-30">
          <button
            onClick={handleScrollToWorks}
            className="bg-[var(--beatriz-blue)] text-white w-12 h-12 md:w-16 md:h-16 flex items-center justify-center hover:bg-[#000088] transition-colors cursor-pointer"
          >
            <ArrowDown className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </main>
      <ScrollSection />
      <Works />
    </>
  );
}
