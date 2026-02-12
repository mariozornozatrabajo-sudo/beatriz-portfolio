import Image from "next/image";

interface ProjectBackgroundProps {
    img1: string;
    img2: string;
    img3: string;
}

export function ProjectBackground({ img1, img2, img3 }: ProjectBackgroundProps) {
    return (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">

            {/* Image 1: Top Hero */}
            <div className="absolute top-0 left-0 w-full h-[120vh]">
                <div className="relative w-full h-full">
                    <Image
                        src={img1}
                        alt="Project background 1"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                </div>
            </div>

            {/* Image 2: Middle Section - User requested full width */}
            <div className="absolute top-[120vh] left-0 w-full h-[120vh]">
                <div className="relative w-full h-full">
                    <Image
                        src={img2}
                        alt="Project background 2"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Image 3: Bottom Section - User requested full width */}
            <div className="absolute top-[240vh] left-0 w-full h-[100vh]">
                <div className="relative w-full h-full">
                    <Image
                        src={img3}
                        alt="Project background 3"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
