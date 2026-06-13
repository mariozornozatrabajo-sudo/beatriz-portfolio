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
        id: 3,
        title: "Sinestesia",
        category: "motion",
        image: "/img-proyectos/sinestesia/sinestesia.mp4",
        aspect: "aspect-square",
        description: "Diseño, desarrollo de artes finales y producción de visuales audiovisuales para una colección presentada en la Fashion Week de Madrid, vinculados al concepto de dismorfia corporal. El proyecto explora la fragmentación y distorsión del rostro mediante animaciones en After Effects, modelado 3D y visuales reactivos en Resolume, generando una experiencia visual inestable y conectada directamente con el sonido.",
        roles: ["Diseñadora", "Audiovisuales"],
        gallery: [
            "/img-proyectos/sinestesia/video-fashion-week-01.mp4",
            "/img-proyectos/sinestesia/boca-en-movimiento.mp4",
            "/img-proyectos/sinestesia/cara-completa-en-movimiento.mp4"
        ],
        featured: true,
        technicalDetails: [
            { label: "Proyecto", value: "Producción de visuales a tiempo real de los visuales de la Fashion Week(Madrid)" },
            { label: "Criterio de composición", value: "Dismorfia corporal" },
            { label: "Tratamiento de imagen", value: "Glitch y deformación" },
            { label: "Programas usados", value: "After Effects y Resolume" }
        ]
    },
    {
        id: 2,
        title: "Probablemente tengas razón",
        category: "motion",
        image: "/img-proyectos/carolina-durante/probablemente-tengas-razon.mp4",
        aspect: "aspect-[4/3]",
        description: "Producción y postproducción de un videoclip para Probablemente tengas razón de Carolina Durante, trabajado a partir de rodaje con croma y una estética basada en la superposición de imágenes. La pieza combina planos detalle de los rostros de los cantantes con imágenes de instrumentos, utilizando el croma y planos picados para aportar ritmo, dinamismo y variedad visual.",
        roles: ["Diseñadora", "Audiovisuales"],
        gallery: [
            "/img-proyectos/carolina-durante/probablemente-tengas-razon-01.mp4",
            "/img-proyectos/carolina-durante/probablemente-tengas-razon-02.mp4",
            "/img-proyectos/carolina-durante/probablemente-tengas-razon-03.mp4"
        ],
        featured: true,
        technicalDetails: [
            { label: "Proyecto", value: "Producción y postproducción de videoclip con croma y tracking" },
            { label: "Criterio de composición", value: "Videoclip indie" },
            { label: "Tratamiento de imagen", value: "Analógico" },
            { label: "Programas usados", value: "After Effects" }
        ]
    },
    {
        id: 1,
        title: "Teatros del canal",
        category: "visual identity",
        image: "/img-proyectos/teatro-canal/teatrocanal-identidad.mp4",
        aspect: "aspect-[3/5]",
        description: "Rediseño de la identidad visual de los Teatros del Canal de Madrid, planteando un sistema flexible que responde a la diversidad de propuestas artísticas del espacio. La identidad se construye a partir de la metáfora de los estados de la materia, permitiendo adaptar la imagen según el tipo de obra sin perder coherencia ni reconocimiento de marca.",
        gallery: [
            "/img-proyectos/teatro-canal/teatrocanal-instagram.png",
            "/img-proyectos/teatro-canal/teatrocanal-mobile.png",
            "/img-proyectos/teatro-canal/teatrocanal-web.png",
            "/img-proyectos/teatro-canal/teatrocanal-bus.png"
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
        id: 4,
        title: "Eterno retorno",
        category: "editorial",
        image: "/img-proyectos/eterno-retorno/eternoretorno-editorial.png",
        aspect: "aspect-[3/4]",
        description: "Diseño, desarrollo de artes finales y maquetación de un libro conceptual sobre el eterno retorno, entendido como una reflexión sobre la repetición de los errores humanos a lo largo de la historia. A través de la analogía con un error informático, el proyecto representa un ciclo de fallos, conflictos y reinicios que culmina en un “reset” final, devolviendo al lector al inicio y reforzando la idea de repetición infinita.",
        gallery: [
            "/img-proyectos/eterno-retorno/eterno-retorno-03-1.png",
            "/img-proyectos/eterno-retorno/eterno-retorno-04-1.png",
            "/img-proyectos/eterno-retorno/eterno-retorno-05-1.png",
            "/img-proyectos/eterno-retorno/eterno-retorno-06-1.png",
            "/img-proyectos/eterno-retorno/eterno-retorno-06-a.png"
        ],
        featured: false,
        technicalDetails: [
            { label: "Proyecto", value: "Diseño, artes finales y producción Eterno Retorno" },
            { label: "Libro", value: "Eterno Retorno" },
            { label: "Formato", value: "A4 apaisado" },
            { label: "Paginación", value: "A5 por página en doble página" },
            { label: "Retícula", value: "6 columnas × 4 filas" },
            { label: "Criterio de composición", value: "Ordenador antiguo(vintage, Windows 7)" },
            { label: "Tratamiento de imagen", value: "Mapa de bits y cuatricomía." }
        ]
    },
    {
        id: 5,
        title: "Jardín botánico",
        category: "illustrations",
        image: "/img-proyectos/jardin-botanico/jardin-botanico.jpg",
        aspect: "aspect-[3/4]",
        description: "Rediseño del folleto informativo e interactivo del Jardín Botánico de Madrid, dirigido a un público infantil y familiar. La propuesta combina fotografía de detalle e ilustraciones infantiles, junto a un formato guillotinado por apartados que facilita la navegación y convierte el folleto en una experiencia visual e interactiva.",
        roles: ["Diseñadora", "Maquetadora"],
        gallery: [
            "/img-proyectos/jardin-botanico/chatgpt-image-1.png",
            "/img-proyectos/jardin-botanico/folleto-trans-003-2-1.png",
            "/img-proyectos/jardin-botanico/folleto-trans-05-2-1.png"
        ],
        featured: false,
        technicalDetails: [
            { label: "Proyecto", value: "Rediseño y remaquetación folleto informativo jardín botánico" },
            { label: "Libro", value: "Jardín botánico" },
            { label: "Formato", value: "A4 apaisado" },
            { label: "Paginación", value: "Escalada por secciones" },
            { label: "Criterio de composición", value: "Accesible e intuitivo" },
            { label: "Tratamiento de imagen", value: "Uso de fotografía profesional" },
            { label: "Tratamiento de ilustraciones", value: "Infantiles y llamativas" }
        ]
    },
    {
        id: 6,
        title: "Otras mentes",
        category: "editorial",
        image: "/img-proyectos/otras-mentes/coleccion-pulpos-01-1.png",
        aspect: "aspect-[3/4]",
        description: "Remaquetación editorial de Otras mentes de Peter Godfrey-Smith, planteada como una versión más actual de la edición original. El proyecto moderniza la organización del texto y la integración de imágenes, trabajando la jerarquía y la lectura a través de una retícula flexible de 6 columnas × 4 filas. El tratamiento visual con mapas de degradado unifica las imágenes y aporta un acabado más contemporáneo.",
        gallery: [
            "/img-proyectos/otras-mentes/mockup-portrait.png",
            "/img-proyectos/otras-mentes/mockup-001.png",
            "/img-proyectos/otras-mentes/mockup-002.png",
            "/img-proyectos/otras-mentes/mockup-003.png",
            "/img-proyectos/otras-mentes/mockup-004.png",
            "/img-proyectos/otras-mentes/mockup-005.png",
            "/img-proyectos/otras-mentes/mockup-006.png",
            "/img-proyectos/otras-mentes/mockup-008.png",
            "/img-proyectos/otras-mentes/indice.png",
            "/img-proyectos/otras-mentes/contra-pulpos.png",
            "/img-proyectos/otras-mentes/coleccion-pulpos-04.png"
        ],
        featured: false,
        technicalDetails: [
            { label: "Proyecto", value: "Remaquetación editorial (actualización de edición)" },
            { label: "Libro", value: "Otras mentes — Peter Godfrey-Smith" },
            { label: "Formato", value: "A4 apaisado" },
            { label: "Paginación", value: "A5 por página en doble página" },
            { label: "Retícula", value: "6 columnas × 4 filas" },
            { label: "Criterio de composición", value: "coherencia + flexibilidad según contenido" },
            { label: "Tratamiento de imagen", value: "mapas de degradado para unificar estilo y aportar acabado contemporáneo" }
        ]
    },
    {
        id: 7,
        title: "Cata la lata",
        category: "illustrations",
        image: "/img-proyectos/cata-la-lata/cata-la-lata.png",
        aspect: "aspect-[4/3]",
        description: "Diseño de packaging para Cata la Lata 2024/25, orientado a renovar la imagen de las conservas con un lenguaje visual más contemporáneo, cercano y atractivo para un público joven. La propuesta convierte cada lata en una pieza con identidad propia, funcionando no solo como envase, sino también como elemento de comunicación y conexión con el comprador.",
        gallery: [
            "/img-proyectos/cata-la-lata/mockup-atunes-05-1.png",
            "/img-proyectos/cata-la-lata/mockup-mejis-01-1.png",
            "/img-proyectos/cata-la-lata/packaging-07-total-def-1.png",
            "/img-proyectos/cata-la-lata/packaging-08-total-def-1.png",
            "/img-proyectos/cata-la-lata/sardi-calidad-10-1.png"
        ],
        featured: false,
        technicalDetails: [
            { label: "Proyecto", value: "Diseño packaging Cata la lata" },
            { label: "Tratamiento de las ilustraciones", value: "Imperfectas y dinámicas" },
            { label: "Tratamiento fotografía", value: "Foto realista con mapa de degradado" }
        ]
    },
    {
        id: 8,
        title: "Nudo",
        category: "illustrations",
        image: "/img-proyectos/nudo/nudo-017-1.png",
        aspect: "aspect-[4/3]",
        description: "Creación de Nudo, un libro de ilustración que explora las pesadillas desde una mirada adulta. Cada pesadilla se personifica como un personaje abstracto y sintético, representando emociones como la ansiedad, las inseguridades o el duelo. El proyecto convierte estos miedos en arquetipos visuales reconocibles, desarrollados en Adobe Fresco y maquetados posteriormente en InDesign.",
        gallery: [
            "/img-proyectos/nudo/nudo-editorial.png",
            "/img-proyectos/nudo/nudo-08-1.png",
            "/img-proyectos/nudo/nudo-09-1.png",
            "/img-proyectos/nudo/nudo-013-1.png",
            "/img-proyectos/nudo/nudo-015-1.png"
        ],
        featured: false,
        technicalDetails: [
            { label: "Proyecto", value: "Maquetación y diseño de libro ilustrado" },
            { label: "Libro", value: "Nudo" },
            { label: "Formato", value: "8,5cm x 14cm" },
            { label: "Paginación", value: "4,25cm x 14cm" },
            { label: "Tratamiento de las ilustraciones", value: "Imperfectas y dinámicas" }
        ]
    }
];
