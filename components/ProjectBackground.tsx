import Image from "next/image";

interface ProjectBackgroundProps {
    images: string[];
}

const MediaRender = ({ src, alt, className, priority, objectFit = "object-cover" }: { src: string, alt: string, className?: string, priority?: boolean, objectFit?: string }) => {
    if (src.endsWith('.mp4')) {
        return (
            <video
                autoPlay
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full ${objectFit} ${className || ""}`}
            >
                <source src={src} type="video/mp4" />
            </video>
        );
    }
    return (
        <Image
            src={src}
            alt={alt}
            fill
            className={`${objectFit} ${className || ""}`}
            priority={priority}
        />
    );
};

export function ProjectBackground({ images }: ProjectBackgroundProps) {
    if (!images || images.length === 0) return null;

    return (
        <div className="absolute inset-0 w-full z-0 pointer-events-none flex flex-col">
            {images.map((src, index) => {
                const isFirst = index === 0;
                const isLast = index === images.length - 1;
                
                // Keep the first item similar to before (h-[120vh] to overlap under the upcoming content)
                // Middle items also get 120vh, last gets min-h-screen.
                const heightClass = isFirst ? "h-[120vh]" : isLast ? "h-[100vh]" : "h-[120vh]";

                return (
                    <div 
                        key={index} 
                        className={`relative w-full shrink-0 ${heightClass}`}
                    >
                        <MediaRender 
                            src={src} 
                            alt={`Project background ${index + 1}`} 
                            className={isFirst ? "opacity-80 object-cover" : "object-contain py-10"} 
                            priority={isFirst} 
                            objectFit={isFirst ? "object-cover" : "object-contain"}
                        />
                    </div>
                );
            })}
        </div>
    );
}
