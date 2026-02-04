"use client";

import { useRef, useState } from "react";

interface GlitchButtonProps {
    text?: string;
    onClick?: () => void;
}

export function GlitchButton({ text = "Hablemos!", onClick }: GlitchButtonProps) {
    const [displayText, setDisplayText] = useState(text);
    const originalText = text;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;':,./<>?";
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) =>
                prev
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("")
            );

            if (iteration >= originalText.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1; // Faster speed
        }, 30); // Faster speed for longer text
    };

    const handleMouseLeave = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(originalText);
    };

    return (
        <button
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="bg-[var(--beatriz-green)] text-[var(--beatriz-blue)] px-8 py-3 md:px-12 md:py-4 text-sm md:text-base cursor-pointer font-bold uppercase tracking-wide font-mono w-fit min-w-[200px]"
        >
            {displayText}
        </button>
    );
}
