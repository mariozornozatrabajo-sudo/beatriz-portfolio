"use client";

import { useRef, useState } from "react";

interface GlitchButtonProps {
    text?: string;
    onClick?: () => void;
}

export function GlitchButton({ text = "Hablemos!", onClick }: GlitchButtonProps) {
    const [displayText, setDisplayText] = useState(text);
    const originalText = text;
    // Use the characters from the text itself for the scramble effect
    const letters = text.split("");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const shuffledIndicesRef = useRef<number[]>([]);

    const handleMouseEnter = () => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        // Create a shuffled array of indices
        const indices = Array.from({ length: originalText.length }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        shuffledIndicesRef.current = indices;

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) => {
                const solvedIndices = new Set(shuffledIndicesRef.current.slice(0, iteration));

                return originalText
                    .split("")
                    .map((letter, index) => {
                        if (solvedIndices.has(index)) {
                            return originalText[index];
                        }
                        // Pick a random letter from the original text
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");
            });

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
            className="bg-[var(--beatriz-yellow)] text-[var(--beatriz-blue)] px-1 py-0 text-sm md:text-base cursor-pointer font-normal tracking-wide font-mono w-fit"
        >
            {displayText}
        </button>
    );
}
