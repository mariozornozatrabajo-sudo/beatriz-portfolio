export type Category = 'editorial' | 'motion graphics' | 'illustrations' | 'visual identity';

export interface Project {
    id: number;
    title: string;
    category: Category;
    image: string;
    featured: boolean;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Eterno Retorno",
        category: "editorial",
        image: "/project-preview.png",
        featured: true,
    },
    {
        id: 2,
        title: "Nudo",
        category: "illustrations",
        image: "/project-preview.png", // Placeholder
        featured: true,
    },
    {
        id: 3,
        title: "Innovar, Emocionar",
        category: "visual identity",
        image: "/project-preview.png", // Placeholder
        featured: true,
    },
    {
        id: 4,
        title: "Memories",
        category: "motion graphics",
        image: "/project-preview.png", // Placeholder
        featured: true,
    },
    // Add more sample data to demonstrate filtering if needed
    {
        id: 5,
        title: "Hidden Editorial",
        category: "editorial",
        image: "/project-preview.png",
        featured: false,
    },
];
