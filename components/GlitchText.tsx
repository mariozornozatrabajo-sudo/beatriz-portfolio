"use client";

import { useRef, useState } from "react";
import React from "react";

interface GlitchTextProps {
    text: string;
    className?: string;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    onClick?: (e: React.MouseEvent) => void;
}

export function GlitchText({ text, className = "", onMouseEnter, onMouseLeave, onClick }: GlitchTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const originalText = text;
    const letters = text.split("");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const shuffledIndicesRef = useRef<number[]>([]);

    const handleMouseEnter = (e: React.MouseEvent) => {
        if (onMouseEnter) onMouseEnter(e);

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
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");
            });

            if (iteration >= originalText.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1;
        }, 30);
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
        if (onMouseLeave) onMouseLeave(e);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(originalText);
    };

    return (
        <span
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={className}
        >
            {displayText}
        </span>
    );
}
