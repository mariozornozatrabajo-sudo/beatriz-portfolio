"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

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
    <main
      ref={container}
      className="relative min-h-screen w-full bg-[var(--beatriz-gray)] text-[var(--beatriz-blue)] overflow-hidden font-mono"
    >
      {/* Background Texture Placeholder */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply z-0">
        {/* Using a noise pattern or simple color for now as placeholder for charcoal texture */}
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-cover opacity-60"></div>
      </div>

      {/* Header / Top Bar */}
      <header className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-20 text-sm md:text-base font-bold">
        <h1 className="nav-anim tracking-tight">Beatriz Montes Gijón</h1>
        <nav className="flex gap-6 md:gap-10">
          {["About", "Works", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-anim relative group hover:bg-[var(--beatriz-blue)] hover:text-white px-1 transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
        </nav>
      </header>

      {/* Central Content */}
      <div className="flex flex-col justify-center min-h-screen px-6 md:px-10 py-20 z-10 relative">
        <div className="space-y-2 md:space-y-4 max-w-[90vw]">
          <h2 className="hero-anim text-6xl md:text-8xl lg:text-9xl font-normal leading-[0.9] text-black/80 mix-blend-multiply tracking-tighter">
            Soy Beatriz
          </h2>
          <h2 className="hero-anim text-6xl md:text-8xl lg:text-9xl font-normal leading-[0.9] text-black/70 mix-blend-multiply tracking-tighter ml-10 md:ml-32">
            Graphic Designer
          </h2>
        </div>

        {/* CTA Button */}
        <div className="hero-anim mt-12 md:mt-16 ml-2 md:ml-4">
          <button className="bg-[var(--beatriz-green)] text-black px-8 py-4 md:px-12 md:py-5 text-sm md:text-base cursor-pointer hover:bg-[#00e626] transition-colors font-bold uppercase tracking-wide">
            Hablemos!
          </button>
        </div>
      </div>

      {/* Bottom Bar / Footer */}
      <footer className="absolute bottom-0 left-0 w-full bg-[#bfbbb5] py-4 px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm z-20 border-t border-black/5">
        <span className="footer-anim">Editorial</span>
        <span className="footer-anim">Motion graphics</span>
        <span className="footer-anim">Ilustrations</span>
        <span className="footer-anim">Visual identity</span>
      </footer>

      {/* Floating Action Button */}
      <div className="footer-anim absolute bottom-16 right-6 md:bottom-20 md:right-10 z-30">
        <button className="bg-[var(--beatriz-blue)] text-white w-12 h-12 md:w-16 md:h-16 flex items-center justify-center hover:bg-[#000088] transition-colors">
          <ArrowDown className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </main>
  );
}
