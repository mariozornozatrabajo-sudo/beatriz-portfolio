"use client";

import { useRef, useState } from "react";

export function GlitchButton() {
    const [text, setText] = useState("Hablemos!");
    const originalText = "Hablemos!";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;':,./<>?";
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setText((prev) =>
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

            iteration += 1 / 3; // Control speed
        }, 50);
    };

    const handleMouseLeave = () => {
        // Optional: Reset immediately or let it finish. 
        // Resetting ensures cleanly viewing original text if mouse leaves fast.
        if (intervalRef.current) clearInterval(intervalRef.current);
        setText(originalText);
    };

    return (
        <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="bg-[var(--beatriz-green)] text-[var(--beatriz-blue)] px-8 py-3 md:px-12 md:py-4 text-sm md:text-base cursor-pointer font-bold uppercase tracking-wide font-mono w-48"
        >
            {text}
        </button>
    );
}
