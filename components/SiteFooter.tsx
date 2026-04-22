"use client";

import React from "react";

export function SiteFooter() {
    return (
        <footer className="w-full relative z-40">
            {/* Bottom Row: Yellow Bar */}
            <div className="w-full bg-[#dde904] text-[#041abe] font-mono !text-[14px] [&_a]:!text-[14px] [&_p]:!text-[14px] py-6 px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
                {/* Left: Message */}
                <div className="flex flex-col">
                    <p className="mb-2">Me cago en vuestra puta vida, contratadme</p>
                    <p>:)</p>
                </div>

                {/* Center: Socials */}
                <div className="flex gap-8">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
                    <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="hover:underline">Behance</a>
                </div>

                {/* Right: Contact */}
                <div className="flex flex-col md:items-end text-right">
                    <p>+34 625 22 66 11</p>
                    <a href="mailto:hola@beatrizmontes.es" className="hover:underline">hola@beatrizmontes.es</a>
                </div>
            </div>
        </footer>
    );
}
