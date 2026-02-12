import { ElementType, ReactNode } from "react";

interface StyledTextProps {
    as?: ElementType;
    children: ReactNode;
    className?: string; // Additional classes for font size, weight, etc.
    color?: string; // Default: 'text-[var(--beatriz-yellow)]'
    blendMode?: string; // Default: 'mix-blend-exclusion'
}

export function StyledText({
    as: Tag = "div",
    children,
    className = "",
    color = "text-[var(--beatriz-yellow)]",
    blendMode = "mix-blend-exclusion"
}: StyledTextProps) {
    return (
        <Tag className={`${color} ${blendMode} ${className}`}>
            {children}
        </Tag>
    );
}
