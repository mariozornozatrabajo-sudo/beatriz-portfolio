"use client";

import { useRef, useState } from "react";
import React from "react";

export interface GlitchTextProps {
    text: string;
    className?: string;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    onClick?: (e: React.MouseEvent) => void;
    triggerOnLoad?: boolean;
    triggerOnInView?: boolean;
    duration?: number;
    delay?: number;
    disableHover?: boolean;
}

export function GlitchText({
    text,
    className = "",
    onMouseEnter,
    onMouseLeave,
    onClick,
    triggerOnLoad = false,
    triggerOnInView = false,
    duration = 3000,
    delay = 0,
    disableHover = false
}: GlitchTextProps) {
    // Helper to generate a random string of same length
    const scramble = (str: string) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        return str.split("").map(char => {
            if (char === " " || char === "\n") return char; // Preserve spaces/newlines
            return chars[Math.floor(Math.random() * chars.length)];
        }).join("");
    };

    // Initialize with scrambled text if it should trigger on load/view (entry animation)
    const [displayText, setDisplayText] = useState(() => {
        if (triggerOnLoad || triggerOnInView) {
            return scramble(text);
        }
        return text;
    });

    const elementRef = useRef<HTMLSpanElement>(null);
    const originalText = text;
    const letters = text.split(""); // Used for animation pool
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const shuffledIndicesRef = useRef<number[]>([]);
    const hasTriggeredRef = useRef(false);

    const startAnimation = () => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        // Create a shuffled array of indices
        const indices = Array.from({ length: originalText.length }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        shuffledIndicesRef.current = indices;

        // Calculate a step size to ensure longer text finishes in the target duration
        // frames = duration / 80ms
        const maxFrames = Math.max(1, Math.floor(duration / 80));
        const step = Math.max(1, Math.ceil(originalText.length / maxFrames));

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
                setDisplayText(originalText); // Ensure final text is clean
            }

            iteration += step; // Speed up revealing based on text length
        }, 80); // Slower interval for better effect
    };

    React.useEffect(() => {
        if (triggerOnLoad) {
            timeoutRef.current = setTimeout(() => {
                startAnimation();
            }, delay);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [triggerOnLoad, delay]);

    React.useEffect(() => {
        if (!triggerOnInView || hasTriggeredRef.current || !elementRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasTriggeredRef.current) {
                    hasTriggeredRef.current = true;
                    timeoutRef.current = setTimeout(() => {
                        startAnimation();
                    }, delay);
                    // Optional: Disconnect observer after triggering once
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(elementRef.current);

        return () => observer.disconnect();
    }, [triggerOnInView, delay]);

    const handleMouseEnter = (e: React.MouseEvent) => {
        if (disableHover || triggerOnInView) return; // Disable hover if using scroll trigger or explicitly disabled
        if (onMouseEnter) onMouseEnter(e);
        startAnimation();
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
        if (disableHover || triggerOnInView) return; // Disable hover if using scroll trigger or explicitly disabled
        if (onMouseLeave) onMouseLeave(e);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(originalText);
    };

    return (
        <span
            ref={elementRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`inline-block ${className}`} // inline-block helps with transforms if needed
        >
            {displayText}
        </span>
    );
}
