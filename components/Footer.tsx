/* eslint-disable react-hooks/refs */
"use client";

import Link from "next/link";
import { GlitchText } from "./GlitchText";

export function Footer() {
    return (
        <footer
            className="absolute bottom-0 left-0 w-full bg-[var(--beatriz-gray)] py-4 px-6 md:px-10 hidden md:flex md:justify-between gap-4 text-xs md:text-sm z-20 border-t border-black/5 text-[var(--beatriz-blue)]"
        >
            <Link href="/works?category=editorial">
                <GlitchText
                    text="Editorial"
                    className="relative z-50 text-center md:text-left cursor-pointer hover:font-bold transition-all text-[var(--beatriz-blue)] underline decoration-solid"
                />
            </Link>
            <Link href="/works?category=motion">
                <GlitchText
                    text="Motion graphics"
                    className="relative z-50 text-center cursor-pointer hover:font-bold transition-all text-[var(--beatriz-blue)] underline decoration-solid"
                />
            </Link>
            <Link href="/works?category=illustrations">
                <GlitchText
                    text="Ilustrations"
                    className="relative z-50 text-center cursor-pointer hover:font-bold transition-all text-[var(--beatriz-blue)] underline decoration-solid"
                />
            </Link>
            <Link href="/works?category=visual%20identity">
                <GlitchText
                    text="Visual identity"
                    className="relative z-50 text-center md:text-right cursor-pointer hover:font-bold transition-all text-[var(--beatriz-blue)] underline decoration-solid"
                />
            </Link>
        </footer>
    );
}
