"use client";

import { Works } from "@/components/Works";
import { Footer } from "@/components/Footer";
import Link from "next/link";


export default function WorksPage() {


    return (
        <main className="relative min-h-screen w-full bg-[var(--beatriz-gray)] text-[var(--beatriz-blue)] font-mono">
            {/* Header */}


            <Works showTitle={true} showFilters={true} showViewAllButton={false} />

            <Footer />
        </main>
    );
}
