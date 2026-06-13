"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { GlitchText } from "@/components/GlitchText";
import { GlitchButton } from "@/components/GlitchButton";

export default function ContactPage() {
    const container = useRef<HTMLElement>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedService, setSelectedService] = useState("");

    const services = [
        "Identidad visual",
        "Motion Graphics",
        "Editorial",
        "Ilustración"
    ];

    useGSAP(
        () => {
            gsap.fromTo(
                ".contact-anim",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                }
            );
        },
        { scope: container }
    );

    return (
        <main
            ref={container}
            className="w-full min-h-screen bg-[var(--background)] pt-24 pb-24 md:pt-32 px-6 md:px-10 flex flex-col font-mono"
        >
            <div className="w-full flex flex-col gap-16 relative">
                {/* Header Section */}
                <div className="flex flex-col gap-8 flex-grow">
                    <h1 className="contact-anim font-heading font-semibold text-5xl md:text-[96px] leading-[1.1] md:leading-[90px] text-[var(--beatriz-yellow)] w-full capitalize mix-blend-difference">
                        Cuéntame sobre tu proyecto
                    </h1>
                    <p className="contact-anim text-[16px] md:text-[20px] leading-relaxed text-[var(--beatriz-blue)] max-w-4xl">
                        Ya sea que necesites una estrategia de marketing, análisis de datos, desarrollo web o branding, nuestro equipo está listo para trabajar contigo. Completa el formulario y descubre cómo podemos hacer realidad tus ideas. ¡Juntos, llevaremos tu proyecto al siguiente nivel!
                    </p>
                </div>

                {/* Form Section */}
                <form action="https://formsubmit.co/beatrizmontesgijon@gmail.com" method="POST" className="contact-anim flex flex-col gap-12 w-full mt-12 md:mt-24">
                    
                    {/* First Row: 4 Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 lg:gap-12 w-full">
                        <div className="w-full relative group">
                            <input 
                                name="name"
                                type="text"
                                className="w-full bg-transparent border-b border-black py-4 px-2 text-[16px] text-black focus:outline-none placeholder-[#666] transition-colors focus:border-[var(--beatriz-blue)]"
                                placeholder="Nombre"
                                required
                            />
                        </div>
                        <div className="w-full relative group">
                            <input 
                                name="email"
                                type="email"
                                className="w-full bg-transparent border-b border-black py-4 px-2 text-[16px] text-black focus:outline-none placeholder-[#666] transition-colors focus:border-[var(--beatriz-blue)]"
                                placeholder="Correo electrónico"
                                required
                            />
                        </div>
                        <div className="w-full relative group">
                            <input 
                                name="phone"
                                type="tel"
                                className="w-full bg-transparent border-b border-black py-4 px-2 text-[16px] text-black focus:outline-none placeholder-[#666] transition-colors focus:border-[var(--beatriz-blue)]"
                                placeholder="Teléfono móvil"
                            />
                        </div>
                        <div className="w-full relative group">
                            <input 
                                name="website"
                                type="url"
                                className="w-full bg-transparent border-b border-black py-4 px-2 text-[16px] text-black focus:outline-none placeholder-[#666] transition-colors focus:border-[var(--beatriz-blue)]"
                                placeholder="Tu web"
                            />
                        </div>
                    </div>

                    {/* Second Row: Dropdown & Textarea */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 w-full">
                        {/* Dropdown column */}
                        <div className="w-full relative col-span-1 border-b border-black self-start">
                            <input type="hidden" name="service" value={selectedService} />
                            <button 
                                type="button"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="w-full flex justify-between items-center py-4 px-2 text-[16px] transition-colors hover:text-[var(--beatriz-blue)]"
                            >
                                <span className={selectedService ? "text-black" : "text-[#666]"}>
                                    {selectedService || "Servicio que te interesa"}
                                </span>
                                <svg 
                                    className={`w-6 h-6 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {/* Dropdown Menu */}
                            <div className={`absolute top-full left-0 w-full md:w-[200px] mt-2 flex flex-col gap-4 py-4 bg-[var(--beatriz-gray)] z-20 transition-all duration-300 origin-top overflow-hidden ${dropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}>
                                {services.map((service) => (
                                    <button
                                        key={service}
                                        type="button"
                                        onClick={() => {
                                            setSelectedService(service);
                                            setDropdownOpen(false);
                                        }}
                                        className="text-left w-fit px-2 py-1 text-[16px] text-[var(--beatriz-blue)] hover:underline decoration-1 underline-offset-4"
                                    >
                                        {service}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Textarea Column */}
                        <div className="w-full md:col-span-3 border border-black p-4 md:p-6 min-h-[186px] flex flex-col justify-end group focus-within:border-[var(--beatriz-blue)]">
                            <textarea 
                                name="message"
                                className="w-full h-full bg-transparent resize-none text-[16px] text-black focus:outline-none placeholder-black/60"
                                placeholder="Explícame cómo es tu proyecto"
                                rows={6}
                                required
                            ></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full flex justify-end mt-8">
                        <button type="submit" className="bg-[var(--beatriz-yellow)] px-8 py-6 origin-center hover:scale-105 transition-transform duration-300">
                            <span className="font-mono text-[var(--beatriz-blue)] text-xl md:text-[24px]">
                                Enviar Propuesta
                            </span>
                        </button>
                    </div>

                </form>
            </div>
            
            {/* The SiteFooter will appear naturally after this main container via layout.tsx */}
        </main>
    );
}
