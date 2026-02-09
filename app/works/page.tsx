"use client";

import { Works } from "@/components/Works";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function WorksPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <main className="relative min-h-screen w-full bg-[var(--beatriz-gray)] text-[var(--beatriz-blue)] font-mono">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 text-sm md:text-base font-normal text-[var(--beatriz-blue)]">
                <div className="tracking-tight font-mono text-[20px] leading-none z-50 relative mix-blend-difference text-[var(--beatriz-blue)]">
                    <Link href="/">Beatriz Montes Gijón</Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-12 bg-[var(--beatriz-blue)] text-white mix-blend-difference">
                    <Link href="/#about" className="hover:text-[var(--beatriz-yellow)] block">About</Link>
                    <Link href="/works" className="hover:text-[var(--beatriz-yellow)] block">Works</Link>
                    <Link href="/#contact" className="hover:text-[var(--beatriz-yellow)] block">Contact</Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden z-50 relative text-[var(--beatriz-blue)] hover:text-[var(--beatriz-yellow)] transition-colors"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-[var(--beatriz-gray)] z-40 flex flex-col items-center justify-center gap-8 text-3xl">
                        <Link href="/#about" onClick={() => setIsMenuOpen(false)} className="hover:text-[var(--beatriz-yellow)] block text-[var(--beatriz-blue)] font-bold">About</Link>
                        <Link href="/works" onClick={() => setIsMenuOpen(false)} className="hover:text-[var(--beatriz-yellow)] block text-[var(--beatriz-blue)] font-bold">Works</Link>
                        <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[var(--beatriz-yellow)] block text-[var(--beatriz-blue)] font-bold">Contact</Link>
                    </div>
                )}
            </header>

            <Works showTitle={true} showFilters={true} showViewAllButton={false} />

            <Footer />
        </main>
    );
}
