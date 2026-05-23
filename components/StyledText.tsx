import { ElementType, ReactNode } from "react";

interface StyledTextProps extends React.HTMLAttributes<HTMLElement> {
    as?: ElementType;
    children: ReactNode;
    className?: string; // Additional classes for font size, weight, etc.
    color?: string; // Default: 'text-[var(--beatriz-yellow)]'
    blendMode?: string; // Default: 'mix-blend-exclusion'
    [key: string]: unknown; // Allow other props
}

export function StyledText({
    as: Tag = "div",
    children,
    className = "",
    color = "text-[var(--beatriz-yellow)]",
    blendMode = "mix-blend-exclusion",
    ...props
}: StyledTextProps) {
    return (
        <Tag className={`${color} ${blendMode} transform-gpu ${className}`} {...props}>
            {children}
        </Tag>
    );
}
