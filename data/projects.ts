export type Category = 'editorial' | 'motion' | 'illustrations' | 'identidad' | 'visual identity';

export interface Project {
    id: number;
    title: string;
    category: Category;
    image: string;
    aspect: string;
    description?: string;
    featured: boolean;
    gallery?: string[]; // Array of image URLs for the hover loop
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Eterno Retorno",
        category: "editorial",
        image: "/img-proyectos/eternoretorno-editorial.png",
        aspect: "aspect-[3/4]",
        description: "Propuesta de diseño editorial del libro Eterno Retorno: reflexiones sobre la cíclica naturaleza del tiempo y la existencia.",
        gallery: ["/img-proyectos/teatrocanal-identidad.jpg", "/img-proyectos/teatrocanal-identidad.jpg", "/img-proyectos/teatrocanal-identidad.jpg"],
        featured: true,
    },
    {
        id: 2,
        title: "Memories",
        category: "motion",
        image: "/img-proyectos/memories-motion.png",
        aspect: "aspect-square",
        description: "Una exploración visual en movimiento sobre la persistencia de la memoria y cómo los recuerdos se transforman con el tiempo.",
        gallery: ["/img-proyectos/teatrocanal-identidad.jpg", "/img-proyectos/teatrocanal-identidad.jpg", "/img-proyectos/teatrocanal-identidad.jpg"],
        featured: true,
    },
    {
        id: 3,
        title: "Nudo",
        category: "editorial",
        image: "/img-proyectos/nudo-editorial.png",
        aspect: "aspect-[4/3]",
        description: "Proyecto editorial que desentraña las complejidades de las relaciones humanas a través de una narrativa visual entrelazada.",
        gallery: ["/img-proyectos/teatrocanal-identidad.jpg", "/img-proyectos/teatrocanal-identidad.jpg", "/img-proyectos/teatrocanal-identidad.jpg"],
        featured: true,
    },
    {
        id: 4,
        title: "Teatros del Canal",
        category: "identidad",
        image: "/img-proyectos/teatrocanal-identidad.jpg",
        aspect: "aspect-[3/5]",
        description: "Rediseño de identidad visual para Teatros del Canal, capturando la esencia contemporánea y dinámica de las artes escénicas.",
        gallery: [
            "/img-proyectos/teatrocanal-identidad.jpg",
            "/img-proyectos/eternoretorno-editorial.png", // Different image
            "/img-proyectos/memories-motion.png", // Different image
            "/img-proyectos/nudo-editorial.png" // Different image
        ],
        featured: true,
    },
];
