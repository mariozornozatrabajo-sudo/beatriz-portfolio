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
}

export function GlitchText({ text, className = "", onMouseEnter, onMouseLeave, onClick, triggerOnLoad = false, triggerOnInView = false, duration = 3000 }: GlitchTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const elementRef = useRef<HTMLSpanElement>(null);
    const originalText = text;
    const letters = text.split("");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
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
            startAnimation();
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [triggerOnLoad]);

    React.useEffect(() => {
        if (!triggerOnInView || hasTriggeredRef.current || !elementRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasTriggeredRef.current) {
                    hasTriggeredRef.current = true;
                    startAnimation();
                    // Optional: Disconnect observer after triggering once
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(elementRef.current);

        return () => observer.disconnect();
    }, [triggerOnInView]);

    const handleMouseEnter = (e: React.MouseEvent) => {
        if (triggerOnInView) return; // Disable hover if using scroll trigger
        if (onMouseEnter) onMouseEnter(e);
        startAnimation();
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
        if (triggerOnInView) return; // Disable hover if using scroll trigger
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
