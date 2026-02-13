"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { GlitchText } from "./GlitchText";

export function Nav() {
    const container = useRef<HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


    return (
        <header
            ref={container}
            className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 text-sm md:text-base font-normal text-[var(--beatriz-blue)] pointer-events-none"
        >
            <div className="nav-anim tracking-tight font-mono text-[20px] leading-none z-50 relative mix-blend-difference text-[var(--beatriz-blue)] pointer-events-auto">
                <Link href="/">Beatriz Montes Gijón</Link>
            </div>

            {/* Desktop Nav */}
            <nav className="nav-anim hidden md:flex gap-12 bg-[var(--beatriz-blue)] text-white mix-blend-difference pointer-events-auto font-mono">
                {["About", "Works", "Contact"].map((item) => (
                    <Link
                        key={item}
                        href={item === "Works" ? "/works" : item === "About" ? "/about" : `/#${item.toLowerCase()}`}
                        className="hover:text-[var(--beatriz-yellow)] block"
                    >
                        <GlitchText text={item} />
                    </Link>
                ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
                onClick={toggleMenu}
                className="md:hidden z-50 relative text-[var(--beatriz-blue)] hover:text-[var(--beatriz-yellow)] transition-colors pointer-events-auto nav-anim"
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-[var(--beatriz-gray)] z-40 flex flex-col items-center justify-center gap-8 text-3xl pointer-events-auto">
                    {["About", "Works", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Works" ? "/works" : item === "About" ? "/about" : `/#${item.toLowerCase()}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="hover:text-[var(--beatriz-yellow)] block text-[var(--beatriz-blue)] font-bold font-mono"
                        >
                            <GlitchText text={item} />
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
