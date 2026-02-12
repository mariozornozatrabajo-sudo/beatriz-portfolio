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
    roles?: string[]; // New field for roles
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

    {
        id: 5,
        title: "Otras Mentes",
        category: "editorial",
        image: "/img-proyectos/eternoretorno-editorial.png", // Using placeholder for now
        aspect: "aspect-[3/4]",
        description: "Remaquetación editorial de Otras mentes (Peter Godfrey-Smith) como una versión más actual de la edición original. La idea fue modernizar cómo se organiza el texto y cómo se integran las imágenes, cuidando la lectura y la jerarquía.\n\nEl diseño está diseñado en formato A4 apaisado, con A5 por página (doble página). Toda la composición se apoya en una retícula de 6 columnas × 4 filas, que mantiene coherencia y permite variar la composición según el contenido. Las imágenes están tratadas con mapas de degradado, para unificar el estilo y darle un acabado más contemporáneo.",
        gallery: ["/img-proyectos/nudo-editorial.png", "/img-proyectos/memories-motion.png", "/img-proyectos/teatrocanal-identidad.jpg"], // Placeholders
        roles: ["Diseñadora", "Maquetadora"],
        featured: true,
    },
];
