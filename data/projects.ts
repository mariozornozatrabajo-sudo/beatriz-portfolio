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
    technicalDetails?: { label: string; value: string }[]; // New field for technical sheet
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Teatros del canal",
        category: "visual identity",
        image: "/img-proyectos/teatrocanal-identidad.mp4",
        aspect: "aspect-[3/5]",
        description: "Rediseño de la identidad visual de los Teatros del Canal de Madrid, adaptando su imagen a la diversidad de propuestas artísticas que alberga. La idea central fue asociar cada tipo de obra con un estado de la materia, usando el líquido como hilo conductor: lo experimental se vincula al estado gaseoso, lo neutro al estado líquido, y lo clásico al estado sólido, reflejando así la naturaleza y la energía de cada disciplina.\n\nEsta metáfora permite que la identidad sea flexible y reconocible al mismo tiempo, adaptándose visualmente según el tipo de contenido sin perder coherencia de marca.",
        gallery: [
            "/img-proyectos/teatrocanal-instagram.png",
            "/img-proyectos/teatrocanal-mobile.png",
            "/img-proyectos/teatrocanal-web.png",
            "/img-proyectos/teatrocanal-bus.png"
        ],
        roles: ["Diseñadora", "Identidad Visual"],
        featured: true,
        technicalDetails: [
            { label: "Proyecto", value: "Rebranding Teatros del Canal (Madrid)" },
            { label: "Criterio de composición", value: "Modernizarlo y actualizarlo" },
            { label: "Programas usados", value: "Figma, Indesign, Illustrator, After Effects" }
        ]
    },
    {
        id: 2,
        title: "Probablemente tengas razón",
        category: "motion",
        image: "/img-proyectos/probablemente-tengas-razon.mp4",
        aspect: "aspect-[4/3]",
        description: "Producción y postproducción de un videoclip para la canción Probablemente tengas razón de Carolina Durante.",
        featured: true,
    },
    {
        id: 3,
        title: "Sinestesia",
        category: "motion",
        image: "/img-proyectos/sinestesia.mp4",
        aspect: "aspect-square",
        description: "",
        featured: true,
    },
    {
        id: 4,
        title: "Eterno retorno",
        category: "editorial",
        image: "/img-proyectos/eternoretorno-editorial.png",
        aspect: "aspect-[3/4]",
        description: "Propuesta de diseño editorial del libro Eterno Retorno: reflexiones sobre la cíclica naturaleza del tiempo y la existencia.",
        featured: true,
    },
    {
        id: 5,
        title: "Jardín botánico",
        category: "editorial",
        image: "/img-proyectos/jardin-botanico.jpg",
        aspect: "aspect-[3/4]",
        description: "",
        featured: true,
    },
    {
        id: 6,
        title: "Otras mentes",
        category: "editorial",
        image: "/projectimgs/otras-mentes/mockup-portrait.png",
        aspect: "aspect-[3/4]",
        description: "Remaquetación editorial de Otras mentes (Peter Godfrey-Smith) como una versión más actual de la edición original.",
        featured: true,
    },
    {
        id: 7,
        title: "Cata la lata",
        category: "editorial",
        image: "/img-proyectos/cata-la-lata.png",
        aspect: "aspect-[4/3]",
        description: "",
        featured: true,
    },
    {
        id: 8,
        title: "Nudo",
        category: "editorial",
        image: "/img-proyectos/nudo-editorial.png",
        aspect: "aspect-[4/3]",
        description: "Proyecto editorial que desentraña las complejidades de las relaciones humanas a través de una narrativa visual entrelazada.",
        featured: true,
    }
];
