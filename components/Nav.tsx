"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { GlitchText } from "./GlitchText";
import { useNavTheme } from "@/context/NavContext";

export function Nav() {
    const container = useRef<HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme } = useNavTheme();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const isDefault = theme === "default";

    return (
        <header
            ref={container}
            className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 text-sm md:text-base font-normal pointer-events-none transition-colors duration-300"
        >
            <div className={`nav-anim tracking-tight font-mono text-[20px] leading-none z-50 relative pointer-events-auto transition-colors duration-300 ${isDefault ? "mix-blend-difference text-[var(--beatriz-blue)]" : "text-[var(--beatriz-yellow)]"
                }`}>
                <Link href="/">Beatriz Montes Gijón</Link>
            </div>

            {/* Desktop Nav */}
            <nav className={`nav-anim hidden md:flex gap-12 pointer-events-auto font-mono transition-colors duration-300 ${isDefault ? "bg-[var(--beatriz-blue)] text-white mix-blend-difference" : "bg-[var(--beatriz-yellow)] text-[var(--beatriz-blue)]"
                }`}>
                {["About", "Works", "Contact"].map((item) => {
                    const href = item === "Works" ? "/works" : item === "About" ? "/about" : "/contact";
                    return (
                        <Link
                            key={item}
                            href={href}
                            className="block hover:opacity-75 transition-opacity"
                        >
                            <GlitchText text={item} />
                        </Link>
                    )
                })}
            </nav>

            {/* Mobile Menu Button */}
            <button
                onClick={toggleMenu}
                className={`md:hidden z-50 relative transition-colors pointer-events-auto nav-anim ${isDefault ? "text-[var(--beatriz-blue)]" : "text-[var(--beatriz-yellow)]"
                    }`}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-[var(--beatriz-gray)] z-40 flex flex-col items-center justify-center gap-8 text-3xl pointer-events-auto">
                    {["About", "Works", "Contact"].map((item) => {
                        const href = item === "Works" ? "/works" : item === "About" ? "/about" : "/contact";
                        return (
                            <Link
                                key={item}
                                href={href}
                                onClick={() => setIsMenuOpen(false)}
                                className="hover:text-[var(--beatriz-yellow)] block text-[var(--beatriz-blue)] font-bold font-mono"
                            >
                                <GlitchText text={item} />
                            </Link>
                        )
                    })}
                </div>
            )}
        </header>
    );
}
